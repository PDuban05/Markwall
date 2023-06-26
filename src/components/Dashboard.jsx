import React, { lazy, Suspense, useEffect, useState } from "react";
import ThemeProvider from "./StyledComponent/theme/ThemeProvider";
import { NavBar } from "./StyledComponent/NavBar";
import { Carrousel } from "./StyledComponent/Carrousel";
import { CarrouselCategories } from "./StyledComponent/Categories";

const Carouselcard = lazy(() => import("./StyledComponent/ProductCarrousel"));
const Promises = lazy(() => import("./StyledComponent/Promises"));
const Footer = lazy(() => import("./StyledComponent/Footer"));
import styled from "styled-components";
import { Title } from "./StyledComponent/Text";
import { StyledButton3 } from "./StyledComponent/botton";
import Loading from "./StyledComponent/Loading/Loading";
import { getProductIndex } from "../firebase/firebase";

const categories = [
  {
    id: 1,
    title: "Charger Compatible Samsung Watch 4 40/44mm",
    image: "https://source.unsplash.com/270x300/?objetos",
    price: 5.99,
    Discounts: 0,
  },
  {
    id: 2,
    title: "Charger Compatible Samsung Watch 4 40/44mm",
    image: "https://source.unsplash.com/270x300/?ropa",
    price: 20.99,
    Discounts: 0,
  },
  {
    id: 3,
    title: "Gamer Chair Ergonomic Desk Office Stark Dresser",
    image: "https://source.unsplash.com/270x300/?sillon",
    price: 50.99,
    Discounts: 0,
  },
  {
    id: 4,
    title: "Pulsos Correas 20 Mm Samsung Galaxy Active",
    image: "https://source.unsplash.com/270x300/?reloj",
    price: 2.99,
    Discounts: 0,
  },
  {
    id: 5,
    title: "Category 5",
    image: "https://source.unsplash.com/270x300/?sillas-gamer",
    price: 4.99,
    Discounts: 14,
  },
  {
    id: 6,
    title: "Category 6",
    image: "https://source.unsplash.com/270x300/?lapiz",
    price: 3.99,
    Discounts: 14,
  },
  {
    id: 7,
    title: "Category 7",
    image: "https://source.unsplash.com/270x300/?cocina",
    price: 9.99,
    Discounts: 14,
  },
  {
    id: 8,
    title: "Category 8",
    image: "https://source.unsplash.com/270x300/?cafeteras",
    price: 25.99,
    Discounts: 0,
  },
];

const ContainerTitle = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 56px auto;

  @media (max-width: 767px) {
    margin: 50px auto 50px auto;
    width: 90%;
    justify-content: start;
  }
`;

const ContainerTitle2 = styled(ContainerTitle)`
  && {
    justify-content: space-between;
    margin: 120px auto 56px auto;

    @media (max-width: 767px) {
      margin: 120px auto 50px auto;
    }
  }
`;

const StyledButton = styled(StyledButton3)`
  && {
    margin: 0 auto;
  }
`;

const Dashboard = () => {
  const [withDiscount, setwithDiscount] = useState(null);
  const [withoutDiscount, setwithoutDiscount] = useState(null);

  useEffect(() => {
    const query = async () => {
      const result = await getProductIndex();

      const productosConDescuento = result.filter(
        (producto) => producto.discount !== "0"
      );
      const productosSinDescuento = result.filter(
        (producto) => producto.discount === "0"
      );

      setwithDiscount(productosConDescuento);
      setwithoutDiscount(productosSinDescuento);
    };

    query();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <NavBar />
        <Carrousel />
        <CarrouselCategories />
        <ContainerTitle>
          <Title>Recommended Products</Title>
        </ContainerTitle>

        {withoutDiscount ? <Carouselcard categories={withoutDiscount} /> : null}

        <StyledButton style={{ margin: "50px auto 0 auto" }}>
          See all
        </StyledButton>

        <ContainerTitle2>
          <Title>Products with Discounts</Title>
          <StyledButton3>See all</StyledButton3>
        </ContainerTitle2>
        {withDiscount ? <Carouselcard categories={withDiscount} /> : null}

        <Promises />
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default Dashboard;
