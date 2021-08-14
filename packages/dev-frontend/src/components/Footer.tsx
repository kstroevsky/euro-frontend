import React from "react";
import { Container, Box, Flex} from "theme-ui";
import {Link} from './Link'
import { Icon } from "./Icon";
import { LiquityLogo } from "./LiquityLogo";

const logoHeight = "32px";

export const Footer: React.FC = ({ children }) => {

  return (
    <Container variant="footer" sx={{
      backgroundColor: 'black',
      height: '200px'
    }}>
    <Container variant="columns" sx={{ justifyContent: "flex-start" }}>
      <Container variant="left">
        <Flex sx={{ justifyContent: "space-evenly", mr: 3, flex: 1, color:'white' }}>
          <Link to='/faq'>FAQ</Link>
          <Link to='github.com'>Codebase</Link>
          <Link to='/frontend'>Frontend</Link>
          <Link to='/contacts'>Contact us</Link>
        </Flex>
      </Container>

      <Container variant="right">
        <Flex sx={{ mr: "12px", fontSize: "20px", justifyContent: "center", color:'white' }}>
          <Link to='twitter.com'>
            <Icon name="info-circle" />
          </Link>
          <Link to='/instagram.com'>
            <Icon name="info-circle" />
          </Link>
          <Link to='/facebook.com'>
            <Icon name="info-circle" />
          </Link>
        </Flex>
      </Container>
    </Container>

      {children}
    </Container>
  );
};
