import React from 'react';
import { Row, Col } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";

const FooterSection = styled("footer")`
  background: rgb(241, 242, 243);
  padding: 2.5rem 0;
`;

const Title = styled("h4")`
  font-size: 22px;
  text-transform: capitalize;
  color: black;

  @media screen and (max-width: 414px) {
    padding: 1.5rem 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.625rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: #15418e;
  }
`;

const Extra = styled("section")`
  background: rgb(241, 242, 243);
  position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 2rem;
`;

const LogoContainer = styled("div")`
  display: flex;
  position: relative;
`;

const Para = styled("div")`
  color: black;
  font-size: 14px;
  width: 70%;
`;

const Large = styled(Link)<any>`
  font-size: 16px;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: capitalize;
  line-height: 24px;
  display: block;
  margin-bottom: 0.625rem;
  transition: all 0.3s ease-in-out;
  max-width: max-content;

  &:hover {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) wavy underline;
  }
`;

const Chat = styled("p")`
  color: black;
  max-width: fit-content;
  border-bottom: 1px solid #18216d;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-bottom: 1px solid rgb(255, 130, 92);
    color: rgb(255, 130, 92);
  }
`;

const FooterContainer = styled("div")`
  max-width: 510px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  transition: all 0.1s ease-in-out;

  a {
    &:hover,
    &:active,
    &:focus {
      -webkit-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }
  }

  @media screen and (max-width: 769px) {
    width: auto;

    a:not(:last-child) {
      display: none;
    }
  }

  div {
    cursor: pointer;
    margin-right: 15px;
    width: 25px;
    height: 25px;

    &:hover {
      fill: rgb(255, 130, 92);
    }
  }
`;

export const Footer: any = ({ t }:any)  => {

interface SocialLinkProps {
  href: string;
  src: string;
}

interface ContainerProps {
  border?: boolean;
  children: React.ReactNode;
}

const SvgIcon = ({ src, width, height }: any) => (
  <img src={`./${src}`} alt={src} width={width} height={height} style={{margin:'auto', display: 'block', strokeWidth:"20"}}/>
);

const StyledContainer = styled("div")<any>`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 60px;
  border-top: ${(p:any) => (p.border ? "1px solid #CDD1D4" : "")};

  @media only screen and (max-width: 1024px) {
    max-width: calc(100% - 68px);
    padding: 0 30px;
  }

  @media only screen and (max-width: 768px) {
    max-width: calc(100% - 38px);
    padding: 0 18px;
  }

  @media only screen and (max-width: 414px) {
    max-width: 100%;
    padding: 0 18px;
  }
`;

  const Container = ({ border, children }: ContainerProps) => (
    <StyledContainer border={border}>{children}</StyledContainer>
  );

  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Large to="/">Tell us everything</Large>
              <Para>
                Do you have any question? Feel free to reach out.
              </Para>
              <a href="mailto:l.qqbadze@gmail.com">
                <Chat>Let's Chat</Chat>
              </a>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>Policy</Title>
              <Large to="/" left="true">
                Application Security
              </Large>
              <Large left="true" to="/">
                Software Principles
              </Large>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Title>Codebase</Title>
              <Large to="/" left="true">
                Frontend
              </Large>
              <Large left="true" to="/">
                Blockchain
              </Large>
            </Col>
          </Row>
          
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink to="/">
              <LogoContainer>
                <Title>Eurity</Title>
              </LogoContainer>
            </NavLink>
            <FooterContainer>
              <SocialLink
                href="https://github.com/kstroevsky/euro-frontend"
                src="github.svg"
              />
              <SocialLink
                href="https://twitter.com/eurity_money"
                src="twitter.svg"
              />
              <SocialLink
                href="https://medium.com/@eurity"
                src="medium.svg"
              />
              <SocialLink
                href="https://medium.com/@eurity"
                src="telegram.svg"
              />
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </>
  );
};