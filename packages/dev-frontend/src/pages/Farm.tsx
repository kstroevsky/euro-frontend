import React, { useState, createContext } from 'react';
import { Container, Box } from "theme-ui";
import { SystemStats } from "../components/SystemStats";
import { Stability } from "../components/Stability/Stability";
import { HeaderMessage } from "../components/HeaderMessage";
import APRChart from "../components/Stability/APRChart";

export interface saveCont {
  setSizeData:any
}

export interface sizeD {
  width: number; 
  height: number;
}

export const SaveContext = createContext<saveCont>({setSizeData:''});

export const Farm: React.FC = (props) => {

  const [sizeData, setSizeData] = useState<sizeD>({width: 458, height: 256});
  console.log(sizeData);

  return (
    <SaveContext.Provider value={ {
      setSizeData: setSizeData
    } }>
      <Container>
        <HeaderMessage title='Save' icon='Favorite'/>
        <Container variant="columns" sx={{ justifyContent: "flex-start" }}>
          <Container variant="left">
            <Stability/>
            <APRChart width={sizeData.width} height={sizeData.height} />
          </Container>

          <Container variant="right">
            <SystemStats />
          </Container>
        </Container>
      </Container>
    </SaveContext.Provider>
  )
}
