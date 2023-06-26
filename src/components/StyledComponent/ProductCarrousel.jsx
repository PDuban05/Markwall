import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LazyLoad from "react-lazy-load";
import { StyledSkeleton } from "./Skeletons";
import { Link } from "react-router-dom";

import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);
import "swiper/swiper-bundle.css";
import { useDispatch } from "react-redux";
import CardProduct from "./Card";

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    width: 90%;
  }
`;

const SwiperSlides = styled(SwiperSlide)`
  && {
    /* border: 2px solid black; */
    width: auto;
  }
`;

const Swipers = styled(Swiper)`
  && {
    .swiper-button-next,
    .swiper-button-prev {
      color: #fafafa;
      width: 5px;
      height: 5px;
    }
  }
`;

const Carouselcard = ({ categories }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [navigationEnabled, setNavigationEnabled] = useState(false);
  const dispatch = useDispatch();

  const swiperOptions = {
    modules: [Navigation, FreeMode],
    slidesPerView: "auto",
    freeMode: true,
    spaceBetween: 20,
    navigation: navigationEnabled,
  };

  useEffect(() => {
    const getWindowWidth = () => {
      const { innerWidth: width } = window;
      return width;
    };
    const handleResize = () => {
      const screenWidth = getWindowWidth();
      if (screenWidth <= 767) {
        setNavigationEnabled(false);
      } else {
        setNavigationEnabled(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Swipers {...swiperOptions} className="mySwiper">
        {categories &&
          categories.map((category, index) => (
            <SwiperSlides key={index}>
              <CardProduct category={category} skeleton={4} />
            </SwiperSlides>
          ))}
      </Swipers>
    </Container>
  );
};

export default Carouselcard;
