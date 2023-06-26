import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import { IoIosArrowLeft, IoIosArrowRight } from "./Icons";
import { Skeleton } from "@mui/material";
import LazyLoad from "react-lazy-load";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation]);

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  object-fit: cover;

  @media (max-width: 767px) {
    height: 200px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  @media (max-width: 767px) {
    height: 200px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: #fafafa;
  }

  .swiper-pagination-bullet {
    background-color: red;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  && {
    width: 100%;
    height: 400px;
    @media (max-width: 767px) {
      height: 200px;
    }
  }
`;

const images = [
  { id: 1, src: "https://source.unsplash.com/1200x400/?objetos" },
  { id: 2, src: "https://source.unsplash.com/1200x400/?ropa" },
  { id: 3, src: "https://source.unsplash.com/1200x400/?zapatos" },
  { id: 4, src: "https://source.unsplash.com/1200x400/?camisas" },
];

export const Carrousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [navigationEnabled, setNavigationEnabled] = useState(false);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const swiperOptions = {
    modules: [Navigation, Pagination],

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
      {isLoading && <StyledSkeleton variant="rectangular" />}
      <LazyLoad>
        <StyledSwiper
          {...swiperOptions}
          pagination={{
            dynamicBullets: true,
          }}
          className="mySwiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <Image
                key={image.id}
                src={image.src}
                alt={`Imagen ${image.id}`}
                onLoad={handleImageLoaded}
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </LazyLoad>
    </Container>
  );
};
