import React, { useEffect, useState } from "react";
import ThemeSelector from "./theme/ThemeSelector";
import { Link } from "react-router-dom";
import {
  ContainerIcon,
  ContainerNavBar,
  ContainerSearchBar,
} from "./Container";
import { StyledImg } from "./Img";
import {
  AiOutlineUsers,
  BsCart3s,
  BsSearchs,
  IoLocationOutlines,
  MdArrowDown,
  MdFavoriteBorders,
} from "./Icons";
import { StyledButton2 } from "./botton";
import { SearchBar } from "./Inputs";
import styled from "styled-components";
import { Badge, ThemeProvider, createTheme } from "@mui/material";
import { Text5 } from "./Text";
import UserNav from "./UserNav";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e30613",
    },
  },
});

const ContainerFirst = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  width: 25%;
  height: 100%;
  /* gap: 15px; */

  @media (max-width: 1024px) {
    width: 20%;
  }
`;

const ContainerSecond = styled(ContainerFirst)`
  width: 40%;

  @media (max-width: 767px) {
    width: 60%;
  }
`;

const ContainerThird = styled(ContainerFirst)`
  align-items: end;
  width: 35%;

  @media (max-width: 767px) {
    width: 20%;
    gap: 0;
  }
`;

const CategoriaLink = styled.a`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
  color: ${(props) => props.theme.text};
`;
const Categories = styled(CategoriaLink)`
  color: #e30613;
`;
const CategoriesInside = styled(CategoriaLink)`
  color: #fff;
  padding: 15px;

  &:hover {
    background-color: #e30613;
  }
`;

const ContainerBtn = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const ContainerLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ContainerIcons = styled.div`
  display: flex;
  gap: 20px;

  align-items: end;

  @media (max-width: 767px) {
    gap: 10px;
  }
`;

const CategoriaInside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  width: 250px;
  top: 20px;
  left: -80px;
  border-radius: 5px;
  background-color: #353333;
  z-index: 2;
  visibility: hidden;

  &::before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #353333;
    top: -10px;
    left: 162px;
  }
`;

const ContainerCategories = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:hover ${CategoriaInside} {
    visibility: visible;
  }
`;

const ContainerFather = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  height: 100%;
  padding: 10px 0;

  @media (max-width: 767px) {
    width: 100%;
    padding: 10px;
  }
`;

const ContainerLocation = styled.div`
  display: flex;
  align-items: center;
`;

const StyledText5 = styled(Text5)`
  font-size: 14px;
  @media (max-width: 767px) {
    font-size: 12px;
    display: none;
  }
`;

const StyledText6 = styled(StyledText5)`
  display: flex;
  white-space: nowrap;
`;

const ContainerEndBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;

  @media (max-width: 1024px) {
    justify-content: end;
    align-items: start;
  }
`;

const ContainerFlex = styled.div`
  display: flex;
`;
const ContainerSelector = styled.div`
  transform: scale(0.8);
  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledMdFavoriteBorders = styled(MdFavoriteBorders)`
  @media (max-width: 767px) {
    transform: scale(0.8);
  }
`;

const StyledBsCart3s = styled(BsCart3s)`
  @media (max-width: 767px) {
    transform: scale(0.8);
  }
`;

export const NavBar = () => {
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    try {
      const localData = JSON.parse(localStorage.getItem("DataUser"));

      if (Array.isArray(localData) && localData.length > 0) {
        const dataArray = { ...localData[0] };
        setDataUser(dataArray);
      } else {
        setDataUser(localData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const deleteToken = () => {
      if (localStorage.removeItem("remember") == "") {
        localStorage.removeItem("DataUser");
        localStorage.removeItem("remember");
      }
    };
    window.addEventListener("beforeunload", deleteToken);
    return () => {
      window.removeEventListener("beforeunload", deleteToken);
    };
  }, []);

  return (
    <ContainerNavBar>
      <ContainerFather>
        <ContainerFirst>
          <Link to="/">
            <StyledImg src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Flogo.svg?alt=media&token=d05ea4b4-ef50-4988-a912-633bf8c89cd3" />
          </Link>

          <ContainerLocation>
            <IoLocationOutlines />
            <StyledText6>Ingresa tu dirección</StyledText6>
          </ContainerLocation>
        </ContainerFirst>
        <ContainerSecond>
          <ContainerSearchBar>
            <SearchBar id="search-bar" placeholder="Search products" />

            <ContainerIcon>
              <BsSearchs />
            </ContainerIcon>
          </ContainerSearchBar>

          <ContainerLink>
            <ContainerCategories>
              <Categories>Categories</Categories>
              <MdArrowDown />

              <CategoriaInside>
                <CategoriesInside>Clothing</CategoriesInside>
                <CategoriesInside>Electronics</CategoriesInside>
                <CategoriesInside>Furniture</CategoriesInside>
                <CategoriesInside>Beauty</CategoriesInside>
                <CategoriesInside>Books</CategoriesInside>
                <CategoriesInside>Toys</CategoriesInside>
                <CategoriesInside>Sports</CategoriesInside>
                <CategoriesInside>Home Decor</CategoriesInside>
                <CategoriesInside>Pet Supplies</CategoriesInside>
                <CategoriesInside>Jewelry</CategoriesInside>
                <CategoriesInside>Office Supplies</CategoriesInside>
              </CategoriaInside>
            </ContainerCategories>

            <CategoriaLink>Offers</CategoriaLink>
            <CategoriaLink>Record</CategoriaLink>
            <CategoriaLink>Supermarket</CategoriaLink>
            <CategoriaLink>Fashion</CategoriaLink>
          </ContainerLink>
        </ContainerSecond>

        <ContainerThird>
          <ContainerFlex>
            {dataUser !== null ? null : (
              <ContainerBtn>
                <Link to="/register">
                  <StyledButton2>Registrarse</StyledButton2>
                </Link>
                <Link to="/login">
                  <StyledButton2>Iniciar sesión</StyledButton2>
                </Link>
              </ContainerBtn>
            )}

            <ContainerEndBar>
              <ContainerSelector>
                <ThemeSelector />
              </ContainerSelector>

              <UserNav dataUser={dataUser} />
            </ContainerEndBar>
          </ContainerFlex>

          <ContainerIcons>
            <StyledMdFavoriteBorders />
            <ThemeProvider theme={theme}>
              <Link to="/shopingcard">
                <Badge
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                  color="secondary"
                >
                  <StyledBsCart3s color="action" />
                </Badge>
              </Link>
            </ThemeProvider>
          </ContainerIcons>
        </ContainerThird>
      </ContainerFather>
    </ContainerNavBar>
  );
};
