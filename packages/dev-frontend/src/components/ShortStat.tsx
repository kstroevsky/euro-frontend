import React, {useState, useEffect} from "react";
import { Flex, Heading, Box, Image } from "theme-ui";
import { useLiquitySelector } from "@liquity/lib-react";
import { LiquityStoreState } from "@liquity/lib-base";

export const ShortStat: React.FC = (props) => {
  const selectPrice = ({ price }: LiquityStoreState) => price;
  const price = useLiquitySelector(selectPrice);
  console.log(price)
  const [maticPrice, setEditedPrice] = useState(price.toString(2));

  useEffect(() => {
    setEditedPrice(price.toString(2));
  }, [price]);

  return (
    <Flex sx={{ alignItems:"center", justifyContent:"center", textAlign:"center", my: ['15px','15px'], height:'auto' }}>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <Heading as="h3" sx={{marginBottom: '8px'}}>MATIC</Heading>
            <Box as="span">${maticPrice}</Box>
          </div>
        </Box>
      </Box>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <Heading as="h3" sx={{marginBottom: '8px'}}>MATIC</Heading>
            <Box as="span">$1600</Box>
          </div>
        </Box>
      </Box>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <Heading as="h3" sx={{marginBottom: '8px'}}>mEUR</Heading>
            <Box as="span">$1600</Box>
          </div>
        </Box>
      </Box>
      <Box sx={{ flexGrow:1, flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Box sx={{ lineHeight: 0 }} >
          <Image src="./matic-icon.svg" sx={{ height:'32px' }} />
          <div>
            <Heading as="h3" sx={{marginBottom: '8px'}}>ERTY</Heading>
            <Box as="span">$1600</Box>
          </div>
        </Box>
      </Box>
    </Flex>
  );
};
