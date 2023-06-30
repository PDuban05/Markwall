import React from "react";
import LazyLoad from "react-lazy-load";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TextDiscount, TextPrice } from "./Text";
import { useDispatch } from "react-redux";
import { StateLink } from "../../features/Router/LinkSlice";
import { useState } from "react";
import { StyledSkeleton } from "./Skeletons";
import { formatCurrency } from "../../helpers/functions/Formatprice";

const CardContainerImg = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  margin: 0 0 0 0;
`;
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
`;

const CardShadow = styled(CardImage)`
  position: absolute;
  top: 10%;
  width: 100%;
  height: 90%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(15px);
  -webkit-filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.1, 0.5, 0.6, 1) 0s;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  cursor: pointer;
  width: 270px;
  height: 404px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.1, 0.5, 0.6, 1) 0s;

  &:hover ${CardShadow} {
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.1, 0.5, 0.6, 1) 0s;
  }

  @media (max-width: 767px) {
    width: 170px;
    height: 270px;
  }
`;
const CardBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 2%;
  height: 25%;

  @media (max-width: 767px) {
    height: 40%;
  }
`;

const CardTitle = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 26px;
  color: ${(props) => props.theme.text};
  height: 60%;
  overflow: hidden;

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const DotDiscounts = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e30613;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Discounts = styled.label`
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  color: white;
  text-align: center;
  line-height: 100%;
`;

const ContainerSkeleton = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 10;
  height: 100%;
  width: 100%;
`;

const LazyLoads = styled(LazyLoad)`
  && {
    width: 100%;
    height: 75%;

    @media (max-width: 767px) {
      height: 60%;
    }
  }
`;

const ContainerFlex = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledTextPrice = styled(TextPrice)`
  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

const CardProduct = ({ category, skeleton }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handleclick = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    useDispatch(StateLink(randomNumber));
  };
  return (
    <Card>
      {isLoading && (
        <ContainerSkeleton>
          <StyledSkeleton
            variant="rectangular"
            width="100%"
            height="300px"
            animation="wave"
          />
          <StyledSkeleton
            variant="rounded"
            width="100%"
            height="20px"
            animation="wave"
          />
          <StyledSkeleton
            variant="rounded"
            width="100%"
            height="20px"
            animation="wave"
          />
          <StyledSkeleton
            variant="rounded"
            width="30%"
            height="15px"
            animation="wave"
          />
        </ContainerSkeleton>
      )}

      <LazyLoads threshold={0.5} offset={300}>
        <CardContainerImg>
          <CardShadow src={category.image} />

          <Link
            to={`/details?id=${category.id}&name=${encodeURIComponent(
              category.name
            )}`}
            onClick={handleclick}
          >
            <CardImage
              src={Object.values(category.urlImg)[0]}
              alt={category.name}
              onLoad={handleImageLoaded}
              loading="lazy"
            />
          </Link>

          {category.discount == 0 ? null : (
            <DotDiscounts>
              <Discounts>{category.discount}% Off</Discounts>
            </DotDiscounts>
          )}
        </CardContainerImg>
      </LazyLoads>

      <CardBody style={{ visibility: isLoading ? "hidden" : "visible" }}>
        <CardTitle>{category.name}</CardTitle>

        {category.discount && category.discount !== "0" ? (
          <ContainerFlex>
            <TextDiscount style={{ fontSize: "14px" }}>
              {formatCurrency(category.price, "USD")}
            </TextDiscount>
            <StyledTextPrice>
              {formatCurrency(
                category.price -
                  (category.price * parseFloat(category.discount)) / 100,
                "USD"
              )}
            </StyledTextPrice>
          </ContainerFlex>
        ) : (
          <StyledTextPrice>
            {formatCurrency(
              category.price -
                (category.price * parseFloat(category.discount)) / 100,
              "USD"
            )}
          </StyledTextPrice>
        )}
      </CardBody>
    </Card>
  );
};

export default CardProduct;
