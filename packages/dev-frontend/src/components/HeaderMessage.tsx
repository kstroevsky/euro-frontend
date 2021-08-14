import { Box, Flex, Heading, Text } from "theme-ui";
import { isCommaListExpression } from "typescript";

import { Icon } from "./Icon";

type InfoMessageProps = {
  title: string;
  icon?: React.ReactNode;
};

export const HeaderMessage: React.FC<InfoMessageProps> = ({ title, children, icon }) => (
  <Box sx={{  }}>
    <Flex sx={{ alignItems: "center", mt: "20px", justifyContent: "center"}}>
      <Box sx={{ mr: "12px", fontSize: "20px" }}></Box>

      <Heading as="h1">{title}</Heading>
    </Flex>

    <Text sx={{ fontSize: 2 }}>{children}</Text>
  </Box>
);
