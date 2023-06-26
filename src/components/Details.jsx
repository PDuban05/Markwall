import React, { lazy, Suspense, useEffect, useState } from "react";
import ThemeProvider from "./StyledComponent/theme/ThemeProvider";
import { NavBar } from "./StyledComponent/NavBar";

const Carouselcard = lazy(() => import("./StyledComponent/ProductCarrousel"));
const Footer = lazy(() => import("./StyledComponent/Footer"));
import styled from "styled-components";
import { Title } from "./StyledComponent/Text";
import { StyledButton3 } from "./StyledComponent/botton";
import ProductDetails from "./StyledComponent/ProductDetails";
import { getProduct, getProductIndex } from "../firebase/firebase";
import Loading from "./StyledComponent/Loading/Loading";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ContainerTitle = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ContainerTitle2 = styled(ContainerTitle)`
  && {
    justify-content: space-between;
    margin: 120px auto 56px auto;
    width: 70%;

    @media (max-width: 767px) {
      width: 90%;
    }
  }
`;

const Details = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const stateLink = useSelector((state) => state.link.Link);

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const name = queryParams.get("name");
    // if (load == false) {
    const query = async () => {
      const result = await getProduct(id);
      setData(result);
      
    };
    setLoad(true);
    query();
    // }
    window.scrollTo(0, 0);
  }, [stateLink]);

  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <NavBar />
        <ProductDetails data={data} />

        <ContainerTitle2>
          <Title>Products with Discounts</Title>
          <StyledButton3>See all</StyledButton3>
        </ContainerTitle2>
        {withDiscount ? <Carouselcard categories={withDiscount} /> : null}
        <br />
        <br />
        <br />
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default Details;
