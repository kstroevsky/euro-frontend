import { Container } from "theme-ui";

import { Trove } from "../components/Trove/Trove";
import { SystemStats } from "../components/SystemStats";
import { PriceManager } from "../components/PriceManager";
import { HeaderMessage } from "../components/HeaderMessage";


export const Dashboard: React.FC = () => (
  <Container>
    <HeaderMessage title='Vault' icon='AccountBalanceWalletIcon'/>
    <Container variant="columns">
      <Container variant="left">
        <Trove />
        <PriceManager />
      </Container>

      <Container variant="right">
        <SystemStats />
      </Container>
    </Container>
  </Container>
);
