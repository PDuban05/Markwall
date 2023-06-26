import React, { lazy, Suspense, useEffect, useState } from "react";
import ThemeProvider from "./StyledComponent/theme/ThemeProvider";
import { NavBar } from "./StyledComponent/NavBar";
import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  InputAdornment,
  Radio,
} from "@mui/material";
import {
  Text4,
  Text5,
  Text6,
  Text7,
  Text8,
  TextDescription1,
} from "./StyledComponent/Text";
import {
  StyleButtonCount,
  StyleButtonCount2,
  StyledButton,
  StyledRadio,
} from "./StyledComponent/botton";
import { AiFillGifts, GrFormCloses } from "./StyledComponent/Icons";
import { StyledTextField3 } from "./StyledComponent/Inputs";
const Footer = lazy(() => import("./StyledComponent/Footer"));

const products = [
  {
    id: 1,
    title: "Charger Compatible Samsung Watch 4 40/44mm",
    image: "https://source.unsplash.com/68x68/?objetos",
    price: 5.99,
    Discounts: 0,
  },
  {
    id: 2,
    title: "Charger Compatible Samsung Watch 4 40/44mm",
    image: "https://source.unsplash.com/68x68/?ropa",
    price: 20.99,
    Discounts: 0,
  },
  {
    id: 3,
    title: "Gamer Chair Ergonomic Desk Office Stark Dresser",
    image: "https://source.unsplash.com/68x68/?sillon",
    price: 50.99,
    Discounts: 0,
  },
  {
    id: 4,
    title: "Pulsos Correas 20 Mm Samsung Galaxy Active",
    image: "https://source.unsplash.com/68x68/?reloj",
    price: 2.99,
    Discounts: 0,
  },
];

const Container = styled.div`
  width: 70%;
  height: 650px;
  margin: 0px auto 100px auto;
  @media (max-width: 1400px) {
    width: 90%;
    border: none;
    height: auto;
  }
`;

const ContainerFather = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 35px;

  @media (max-width: 1094px) {
    flex-direction: column;
  }
`;

const ContainerA = styled.div`
  width: 70%;
  height: 100%;
  margin: 0 0 0px 0;
  @media (max-width: 1094px) {
    width: 100%;
  }
`;

const ContainerB = styled.div`
  width: 30%;
  height: 100%;
  @media (max-width: 1094px) {
    width: 100%;
  }
`;

const ContainerCard = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 28px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
const Bar = styled.div`
  width: 100%;
  height: 60px;
  background: ${(props) => props.theme.background3};
  border-radius: 6px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    padding: 5px;
  }
`;

const ContainerText = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0 0 0;
`;

const CardProduct = styled(Card)`
  && {
    width: 100%;
    height: 100px;
    background: ${(props) => props.theme.background3};

    @media (max-width: 767px) {
      height: auto;
    }
  }
`;

const CardContents = styled(CardContent)`
  && {
    padding: 16px;

    @media (max-width: 767px) {
      padding: 10px;
    }
  }
`;

const ContainerFlex = styled.div`
  display: flex;
`;
const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  width: 68px;
  height: 68px;
`;

const ContainerBody = styled.div`
  display: flex;
  gap: 80px;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ContainerContador = styled.div`
  width: 88px;
  height: 30px;
  display: flex;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
`;

const Hr = styled.hr`
  background: #171b26;
  height: 1px;
  width: 100%;
  margin: 20px 0;
`;

const ShopingCard = () => {
  const [count, setCount] = useState(1);
  const handleCount = (e) => {
    if (e.target.name == "+") {
      setCount(count + 1);
    }
    if (e.target.name == "-") {
      if (count >= 2) {
        setCount(count - 1);
      }
    }
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider>
        <NavBar />

        <Container>
          <ContainerFather>
            <ContainerA>
              <Bar>
                <ContainerText>
                  <Checkbox inputProps={{ "aria-label": "controlled" }} />
                  <Text4>Select All ( 4 Items)</Text4>
                </ContainerText>
                <Text4>Total: $50</Text4>
              </Bar>

              <ContainerProduct>
                {products.map((data, index) => (
                  <CardProduct key={index}>
                    <CardActionArea>
                      <CardContents>
                        <ContainerBody>
                          <ContainerFlex style={{ gap: "12px" }}>
                            <Checkbox
                              inputProps={{ "aria-label": "controlled" }}
                            />
                            <Img src={data.image} />

                            <ContainerColumn
                              style={{ justifyContent: "space-between" }}
                            >
                              <Text5>{data.title}</Text5>

                              <ContainerFlex style={{ gap: "12px" }}>
                                <ContainerFlex>
                                  <Text6>Brand:</Text6>
                                  <Text7>Generic</Text7>
                                </ContainerFlex>
                                <ContainerFlex>
                                  <Text6>Color:</Text6>
                                  <Text7>Black</Text7>
                                </ContainerFlex>
                              </ContainerFlex>
                            </ContainerColumn>
                          </ContainerFlex>

                          <ContainerFlex
                            style={{
                              gap: "40px",
                              alignItems: "center",
                            }}
                          >
                            <Text4> {data.price} </Text4>
                            <ContainerFlex>
                              <ContainerContador>
                                <StyleButtonCount2
                                  name="-"
                                  onClick={handleCount}
                                >
                                  -
                                </StyleButtonCount2>
                                <TextDescription1> {count} </TextDescription1>
                                <StyleButtonCount2
                                  name="+"
                                  onClick={handleCount}
                                >
                                  +
                                </StyleButtonCount2>
                              </ContainerContador>
                            </ContainerFlex>

                            <Text4>$25.00</Text4>

                            <GrFormCloses />
                          </ContainerFlex>
                        </ContainerBody>
                      </CardContents>
                    </CardActionArea>
                  </CardProduct>
                ))}
              </ContainerProduct>

              <ContainerFlex
                style={{
                  gap: "16px",
                  margin: " 40px 0  0  0 ",
                  alignItems: "center",
                }}
              >
                <Text8>Have a coupon?</Text8>
                <StyledTextField3
                  label="Coupon code"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiFillGifts />
                      </InputAdornment>
                    ),
                  }}
                ></StyledTextField3>
              </ContainerFlex>
            </ContainerA>
            <ContainerB>
              <ContainerCard>
                <Text8>Checkout Summary</Text8>

                <ContainerColumn style={{ margin: "30px 0 0 0 " }}>
                  <ContainerFlex style={{ justifyContent: "space-between" }}>
                    <Text4 style={{ fontWeight: "bold" }}>Subtotal</Text4>
                    <Text4>$50.00</Text4>
                  </ContainerFlex>

                  <Hr />

                  <ContainerColumn style={{ gap: "20px" }}>
                    <ContainerFlex style={{ alignItems: "center" }}>
                      <StyledRadio style={{ margin: "8px" }} />
                      <Text4>Free Tracked Courier</Text4>
                    </ContainerFlex>

                    <ContainerFlex
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ContainerFlex
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <StyledRadio style={{ margin: "8px" }} />
                        <Text4>Collect from Shop</Text4>
                      </ContainerFlex>

                      <Text4>€0.00</Text4>
                    </ContainerFlex>

                    <ContainerFlex
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ContainerFlex
                        style={{
                          alignItems: "center",
                          width: "80%",
                        }}
                      >
                        <StyledRadio style={{ margin: "8px" }} />
                        <Text4>Home Delivery - Fully Assembled:</Text4>
                      </ContainerFlex>

                      <Text4>$5.00</Text4>
                    </ContainerFlex>
                  </ContainerColumn>

                  <Hr />

                  <ContainerFlex
                    style={{
                      justifyContent: "space-between",
                      margin: " 0 0 30px 0  ",
                    }}
                  >
                    <Text4 style={{ fontWeight: "bold" }}>Total:</Text4>
                    <Text4>$50.00</Text4>
                  </ContainerFlex>

                  <StyledButton>Proceed To Checkout</StyledButton>
                </ContainerColumn>
              </ContainerCard>
            </ContainerB>
          </ContainerFather>
        </Container>

        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default ShopingCard;
