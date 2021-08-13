fs = require('fs');

const CONTRACTS_PROJ_PTH = '../Eurity' //place your eurity contracts project path here
const ADRESSES_FN = 'localForkDeploymentOutput.json'

const LIB_ETHERS_PTH = './packages/lib-ethers/dist'
const HARDHAT_CFG_FN = '/deployments/hardhat.json'



var actual_data_js = fs.readFileSync(CONTRACTS_PROJ_PTH+'/mainnetDeployment/' +ADRESSES_FN, 'utf8');
var actual_data = JSON.parse(actual_data_js);

var mainnet_cfg_js = fs.readFileSync(LIB_ETHERS_PTH+HARDHAT_CFG_FN, 'utf8');
var mainnet_cfg = JSON.parse(mainnet_cfg_js);


for(var contract_name in mainnet_cfg.addresses){
    console.log(contract_name)
    mainnet_cfg.addresses[contract_name] = actual_data[contract_name].address;
    console.log(mainnet_cfg.addresses[contract_name]);
}
fs.writeFileSync( LIB_ETHERS_PTH+HARDHAT_CFG_FN, JSON.stringify(mainnet_cfg, null, 2))

const name2abi = {}
for (contract_dir of fs.readdirSync(CONTRACTS_PROJ_PTH+'/artifacts/contracts')){
  if (!contract_dir.includes('.sol')){continue}
  console.log(contract_dir)
  var name = contract_dir.split('.')[0]
  full_pth = CONTRACTS_PROJ_PTH+'/artifacts/contracts/'+contract_dir+'/'+name+'.json'
  console.log(full_pth)
  var contract_artefact = fs.readFileSync(full_pth, 'utf8')
  name2abi[name] = JSON.parse(contract_artefact)['abi']
}

for (name in name2abi){
  console.log(LIB_ETHERS_PTH+'/abi/'+name+'.json')
  fs.writeFileSync( LIB_ETHERS_PTH+'/abi/'+name+'.json', JSON.stringify(name2abi[name], null, 2))

}
