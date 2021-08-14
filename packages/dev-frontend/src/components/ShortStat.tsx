import React from "react";
import { Flex, Card, Box, Image } from "theme-ui";
import { InfoIcon } from "./InfoIcon";


export const ShortStat: React.FC = (props) => {
  return (
    <Flex sx={{ alignItems:"center", justifyContent:"center", textAlign:"center", my: ['15px','15px'], height:'auto' }}>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <h3>MATIC</h3>
            <span>$1600</span>
          </div>
        </Box>
      </Box>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <h3>MATIC</h3>
            <span>$1600</span>
          </div>
        </Box>
      </Box>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <h3>mEUR</h3>
            <span>$1600</span>
          </div>
        </Box>
      </Box>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <h3>ERTY</h3>
            <span>$1600</span>
          </div>
        </Box>
      </Box>
    </Flex>
  );
};
