"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketAugmentedWeb3Provider = exports.WebSocketAugmented = exports.isWebSocketAugmentedProvider = void 0;
const providers_1 = require("@ethersproject/providers");
const bytes_1 = require("@ethersproject/bytes");
const WebSocketProvider_1 = require("./WebSocketProvider");
const webSocketAugmentedProviders = [];
const isWebSocketAugmentedProvider = (provider) => webSocketAugmentedProviders.some(webSocketAugmentedProvider => provider instanceof webSocketAugmentedProvider);
exports.isWebSocketAugmentedProvider = isWebSocketAugmentedProvider;
const isHeaderNotFoundError = (error) => typeof error === "object" &&
    typeof error.message === "string" &&
    (error.message.includes(
    // geth
    "header not found") ||
        error.message.includes(
        // openethereum
        "request is not supported because your node is running with state pruning"));
const isTransactionHash = (eventName) => typeof eventName === "string" && bytes_1.hexDataLength(eventName) === 32;
const loadBalancingGlitchRetryIntervalMs = 200;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const waitFor = (f) => (g) => (t, { isActive }) => {
    f(t).then(u => {
        if (u !== null && isActive()) {
            g(u);
        }
    });
};
const pass = (f) => (t, _) => {
    f(t);
};
const passOnce = (f) => (t, { removeMe }) => {
    f(t);
    removeMe();
};
const sequence = (f, g) => (h) => (t, context) => {
    f(u => g(h)(u, context))(t, context);
};
const defer = (f) => (t) => {
    setTimeout(() => {
        f(t);
    }, 0);
};
const WebSocketAugmented = (Base) => {
    let webSocketAugmentedProvider = class extends Base {
        constructor() {
            super(...arguments);
            this._seenBlock = 0;
            this._blockListenerScheduled = false;
            this._blockListeners = new Map();
            this._blockListener = this._onBlock.bind(this);
        }
        openWebSocket(url, network) {
            this._wsProvider = new WebSocketProvider_1.WebSocketProvider(url, network);
            this._wsProvider.onClose = this._onWebSocketClose.bind(this);
            this._wsParams = [url, network];
            this._switchover();
        }
        _onWebSocketClose() {
            this.closeWebSocket();
            console.warn("WebSocketProvider disconnected. Retrying in 10 seconds.");
            this._reconnectTimerId = setTimeout(() => this.openWebSocket(...this._wsParams), 10000);
        }
        closeWebSocket() {
            if (this._wsProvider) {
                this._wsProvider.onClose = null;
                this._wsProvider.close(1000); // normal closure
                this._wsProvider = undefined;
                this._switchover();
                if (this._reconnectTimerId !== undefined) {
                    clearTimeout(this._reconnectTimerId);
                    this._reconnectTimerId = undefined;
                }
            }
        }
        _switchover() {
            if (this._blockListeners.size > 0) {
                if (this._wsProvider) {
                    super.off("block", this._blockListener);
                }
                this._startBlockEvents();
            }
        }
        _onBlock(blockNumber) {
            this._seenBlock = blockNumber;
            if (!this._blockListenerScheduled) {
                this._blockListenerScheduled = true;
                setTimeout(() => {
                    this._blockListenerScheduled = false;
                    [...this._blockListeners].forEach(([, listener]) => listener(this._seenBlock));
                }, 50);
            }
        }
        async _retrySeenBlock(perform, startingBlock) {
            for (let retries = 0;; ++retries) {
                try {
                    const ret = await perform();
                    if (retries) {
                        // console.log(`Glitch resolved after ${retries} ${retries === 1 ? "retry" : "retries"}.`);
                    }
                    return ret;
                }
                catch (error) {
                    if (this._seenBlock !== startingBlock || !isHeaderNotFoundError(error)) {
                        throw error;
                    }
                }
                // console.warn("Load balancing glitch. Retrying...");
                await delay(loadBalancingGlitchRetryIntervalMs);
            }
        }
        async call(transaction, blockTag) {
            const resolvedBlockTag = await blockTag;
            const perform = () => {
                var _a;
                return ((_a = this._wsProvider) === null || _a === void 0 ? void 0 : _a.isReady) ? this._wsProvider.call(transaction, resolvedBlockTag)
                    : super.call(transaction, resolvedBlockTag);
            };
            return resolvedBlockTag === this._seenBlock
                ? this._retrySeenBlock(perform, this._seenBlock)
                : perform();
        }
        async getBalance(addressOrName, blockTag) {
            const resolvedBlockTag = await blockTag;
            const perform = () => {
                var _a;
                return ((_a = this._wsProvider) === null || _a === void 0 ? void 0 : _a.isReady) ? this._wsProvider.getBalance(addressOrName, resolvedBlockTag)
                    : super.getBalance(addressOrName, resolvedBlockTag);
            };
            return resolvedBlockTag === this._seenBlock
                ? this._retrySeenBlock(perform, this._seenBlock)
                : perform();
        }
        _startBlockEvents() {
            if (this._wsProvider) {
                console.log("Listening for new blocks on WebSocketProvider");
                this._wsProvider.on("block", this._blockListener);
            }
            else {
                console.log("Listening for new blocks on basic Provider");
                super.on("block", this._blockListener);
            }
        }
        _stopBlockEvents() {
            if (this._wsProvider) {
                this._wsProvider.off("block", this._blockListener);
            }
            else {
                super.off("block", this._blockListener);
            }
        }
        _wrap(f, g) {
            return [
                f,
                (u) => g(defer(f))(u, {
                    isActive: () => this._blockListeners.has(f),
                    removeMe: () => this._blockListeners.delete(f)
                })
            ];
        }
        on(eventName, listener) {
            if (isTransactionHash(eventName)) {
                const fetchReceipt = this._getTransactionReceiptFromLatest.bind(this, eventName);
                const [, passReceipt] = this._wrap(listener, waitFor(fetchReceipt));
                passReceipt(undefined);
                return this._addBlockListener(listener, passReceipt);
            }
            else if (eventName === "block") {
                return this._addBlockListener(...this._wrap(listener, pass));
            }
            else {
                return super.on(eventName, listener);
            }
        }
        _addBlockListener(key, blockListener) {
            if (!this._blockListeners.has(key)) {
                this._blockListeners.set(key, blockListener);
                if (this._blockListeners.size === 1) {
                    this._startBlockEvents();
                }
            }
            return this;
        }
        once(eventName, listener) {
            if (isTransactionHash(eventName)) {
                const fetchReceipt = this._getTransactionReceiptFromLatest.bind(this, eventName);
                const [, passReceiptOnce] = this._wrap(listener, sequence(waitFor(fetchReceipt), passOnce));
                passReceiptOnce(undefined);
                return this._addBlockListener(listener, passReceiptOnce);
            }
            else if (eventName === "block") {
                return this._addBlockListener(...this._wrap(listener, passOnce));
            }
            else {
                return super.once(eventName, listener);
            }
        }
        off(eventName, listener) {
            if (isTransactionHash(eventName) || eventName === "block") {
                return this._removeBlockListener(listener);
            }
            else {
                return super.off(eventName, listener);
            }
        }
        _removeBlockListener(key) {
            if (this._blockListeners.has(key)) {
                this._blockListeners.delete(key);
                if (this._blockListeners.size === 0) {
                    this._stopBlockEvents();
                }
            }
            return this;
        }
        async getTransaction(transactionHash) {
            var _a, _b;
            const txPromises = [
                super.getTransaction(transactionHash),
                ...(((_a = this._wsProvider) === null || _a === void 0 ? void 0 : _a.isReady) ? [this._wsProvider.getTransaction(transactionHash)] : [])
            ];
            const first = await Promise.race(txPromises);
            const tx = (_b = first !== null && first !== void 0 ? first : (await Promise.all(txPromises)).find(tx => tx !== null)) !== null && _b !== void 0 ? _b : null;
            return tx;
        }
        getTransactionReceipt(transactionHash) {
            var _a;
            return ((_a = this._wsProvider) === null || _a === void 0 ? void 0 : _a.isReady) ? this._wsProvider.getTransactionReceipt(transactionHash)
                : super.getTransactionReceipt(transactionHash);
        }
        getTransactionCount(addressOrName, blockTag) {
            var _a;
            return ((_a = this._wsProvider) === null || _a === void 0 ? void 0 : _a.isReady) ? this._wsProvider.getTransactionCount(addressOrName, blockTag)
                : super.getTransactionCount(addressOrName, blockTag);
        }
        getBlock(blockHashOrBlockTag) {
            var _a;
            return ((_a = this._wsProvider) === null || _a === void 0 ? void 0 : _a.isReady) ? this._wsProvider.getBlock(blockHashOrBlockTag)
                : super.getBlock(blockHashOrBlockTag);
        }
        getBlockWithTransactions(blockHashOrBlockTag) {
            var _a;
            return ((_a = this._wsProvider) === null || _a === void 0 ? void 0 : _a.isReady) ? this._wsProvider.getBlockWithTransactions(blockHashOrBlockTag)
                : super.getBlockWithTransactions(blockHashOrBlockTag);
        }
        async _blockContainsTx(blockNumber, txHash) {
            let block;
            for (block = null; !block; block = await this.getBlock(blockNumber)) {
                await delay(loadBalancingGlitchRetryIntervalMs);
            }
            return block.transactions.some(txHashInBlock => txHashInBlock === txHash);
        }
        async _getTransactionReceiptFromLatest(txHash, latestBlock) {
            txHash = await txHash;
            for (let retries = 0;; ++retries) {
                const receipt = (await this.getTransactionReceipt(txHash));
                if (latestBlock === undefined ||
                    (receipt === null && !(await this._blockContainsTx(latestBlock, txHash))) ||
                    (receipt !== null && receipt.blockNumber + receipt.confirmations - 1 >= latestBlock)) {
                    if (retries) {
                        // console.log(`Glitch resolved after ${retries} ${retries === 1 ? "retry" : "retries"}.`);
                    }
                    return receipt;
                }
                // console.warn("Load balancing glitch. Retrying...");
                await delay(loadBalancingGlitchRetryIntervalMs);
            }
        }
        async waitForTransaction(txHash, confirmations, timeout) {
            if (timeout !== undefined) {
                // We don't use timeout, don't implement it
                return super.waitForTransaction(txHash, confirmations, timeout);
            }
            let latestBlock = undefined;
            for (;;) {
                const receipt = await this._getTransactionReceiptFromLatest(txHash, latestBlock);
                if (receipt !== null &&
                    (confirmations === undefined || receipt.confirmations >= confirmations)) {
                    return receipt;
                }
                latestBlock = await new Promise(resolve => this.once("block", resolve));
            }
        }
    };
    webSocketAugmentedProviders.push(webSocketAugmentedProvider);
    return webSocketAugmentedProvider;
};
exports.WebSocketAugmented = WebSocketAugmented;
exports.WebSocketAugmentedWeb3Provider = exports.WebSocketAugmented(providers_1.Web3Provider);
//# sourceMappingURL=WebSocketAugmentedProvider.js.map