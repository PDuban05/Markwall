import React from "react";
import styled from "styled-components";
import { StyledImg1 } from "./Img";
import { ContainerIcon2, ContainerSearchBar2 } from "./Container";
import { SearchBar2 } from "./Inputs";
import { BsFacebooks, BsInstagrams, BsTwitters } from "./Icons";
import AnimatedImages from "./BouncingImage";
import { InputAdornment } from "@mui/material";

const ContainerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  background-color: #171b26;
  gap: 1%;
  padding: 4% 3% 0 4%;
  overflow: hidden;
`;

const ContainerLinks = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  gap: 20px;

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Container = styled.div`
  display: flex;
  margin: 0 0 50px 0;
  position: relative;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }
`;

export const Label = styled.label`
  color: white;
  font-family: "Inter";
  font-size: 14px;
  line-height: 150%;
`;

export const Title = styled.h2`
  color: white;
  font-family: "Inter";
  font-size: 16px;
  line-height: 150%;
  margin: 0 0 10px 0;
`;

export const Link = styled.a`
  color: white;
  font-family: "Inter";
  font-size: 14px;
  line-height: 150%;
`;
export const Text = styled.p`
  color: white;
  font-family: "Inter";
  font-size: 14px;
  line-height: 150%;
`;

export const ContainerIco = styled.div`
  display: flex;
  gap: 15px;
`;
export const Copyright = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
const ContainerFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
const Footer = () => {
  return (
    <ContainerFooter>
      <Container>
        <AnimatedImages />
        <ContainerLinks>
          <ContainerFlexColumn>
            <StyledImg1 src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Flogo2.svg?alt=media&token=950b6cba-0d99-4b1a-879a-95a478c1b8e1" />
            <Label>Subscribe to Newsletter.</Label>
            <ContainerSearchBar2>
              <SearchBar2 id="search-bar" placeholder="Enter your email" />
              <ContainerIcon2>➝</ContainerIcon2>
            </ContainerSearchBar2>
          </ContainerFlexColumn>
        </ContainerLinks>
        <ContainerLinks>
          <Title>Shopping</Title>
          <Link>My account</Link>
          <Link>Shipping</Link>
          <Link>orders</Link>
          <Link>Terms & Conditions</Link>
        </ContainerLinks>
        <ContainerLinks>
          <Title>Shopping</Title>
          <Link>My account</Link>
          <Link>Shipping</Link>
          <Link>orders</Link>
          <Link>Terms & Conditions</Link>
        </ContainerLinks>
        <ContainerLinks>
          <Title>Contact</Title>
          <Text>
            PO Box. 16122, Collins {<br />} Street, Victoria, Australia.
          </Text>

          <Text>Social Links</Text>
          <ContainerIco>
            <BsFacebooks />
            <BsTwitters />
            <BsInstagrams />
          </ContainerIco>
        </ContainerLinks>
      </Container>

      <Copyright>Copyright @ 2023 Logo. All rights reserved.</Copyright>
    </ContainerFooter>
  );
};

export default Footer;
