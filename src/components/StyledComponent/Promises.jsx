import React from "react";
import styled from "styled-components";
import { AiOutlineQuestionCircles, BsBoxSeams, GiBackwardTimes } from "./Icons";

const Container = styled.div`
  display: flex;
  width: 70%;
  gap: 3.3%;
  justify-content: space-between;
  margin: 100px auto 80px auto;

  @media (max-width: 767px) {
    width: 90%;
    flex-direction: column;
    gap: 20px;
  }
`;
const ContaienerPromises = styled.div`
  display: flex;
  gap: 8px;
  width: 30%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => props.theme.text};
`;

const Label = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.text};
`;

const Icon = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;

const Link = styled.a`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-decoration-line: underline;
  color: ${(props) => props.theme.text};
`;

const Promises = () => {
  return (
    <Container>
      <ContaienerPromises>
        <Icon>
          <BsBoxSeams />
        </Icon>
        <Body>
          <Title>Free Shipping & Returns*</Title>
          <Label>Phasellus lorem malesuada ligula cosmopolis</Label>
          <Link>Terms & Condition Applied</Link>
        </Body>
      </ContaienerPromises>
      <ContaienerPromises>
        <Icon>
          <GiBackwardTimes />
        </Icon>
        <Body>
          <Title>Long-time Warranty</Title>
          <Label>Phasellus lorem malesuada ligula cosmopolis</Label>
          <Link>Read more</Link>
        </Body>
      </ContaienerPromises>
      <ContaienerPromises>
        <Icon>
          <AiOutlineQuestionCircles />
        </Icon>
        <Body>
          <Title>Top Customer Service</Title>
          <Label>Phasellus lorem malesuada ligula cosmopolis</Label>
          <Link>Read more</Link>
        </Body>
      </ContaienerPromises>
    </Container>
  );
};

export default Promises;
