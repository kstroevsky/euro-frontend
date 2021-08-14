import React, { useCallback, useEffect, useContext } from "react";
import useResizeAware from 'react-resize-aware';
import { Card, Heading, Box, Flex, Button } from "theme-ui";
import { PropertyAssignment } from "typescript";
import { InfoMessage } from "../InfoMessage";
import { useStabilityView } from "./context/StabilityViewContext";
import { RemainingLQTY } from "./RemainingLQTY";
import { Yield } from "./Yield";
import { SaveContext } from '../../pages/Farm';

export const NoDeposit: React.FC = (props) => {
  const { dispatchEvent } = useStabilityView();
  const [resizeListener, sizes] = useResizeAware();

  const handleOpenTrove = useCallback(() => {
    dispatchEvent("DEPOSIT_PRESSED");
  }, [dispatchEvent]);

  const sizer = useContext(SaveContext);
  
  useEffect(() => {
    sizer.setSizeData(sizes);
  },[sizes, sizer]);

  return (
    <Card>
      {resizeListener}
      <Heading>
        Stability Pool
        <Flex sx={{ justifyContent: "flex-end" }}>
          <RemainingLQTY />
        </Flex>
      </Heading>
      <Box sx={{ p: [2, 3] }}>
        <InfoMessage title="You have no mEUR in the Stability Pool.">
          You can earn MATIC and ERTY rewards by depositing mEUR.
        </InfoMessage>

        <Flex variant="layout.actions">
          <Flex sx={{ justifyContent: "flex-start", flex: 1, alignItems: "center" }}>
            <Yield />
          </Flex>
          <Button onClick={handleOpenTrove}>Deposit</Button>
        </Flex>
      </Box>
    </Card>
  );
};
