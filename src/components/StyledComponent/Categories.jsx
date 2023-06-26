import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { IoIosArrowLeftXs, IoIosArrowRightXs } from "./Icons";
import { CategoryTitle, Title } from "./Text";
import { useSwipeable } from "react-swipeable";
import LazyLoad from "react-lazy-load";
import { StyledSkeleton } from "./Skeletons";

const categories = [
  {
    id: 1,
    title: "Electrónica",
    icon: "FaLaptop",
    image: "https://source.unsplash.com/600x600/?electronics",
  },
  {
    id: 2,
    title: "Hogar",
    icon: "FaHome",
    image: "https://source.unsplash.com/600x600/?home",
  },
  {
    id: 3,
    title: "Ropa",
    icon: "FaTshirt",
    image: "https://source.unsplash.com/600x600/?clothing",
  },
  {
    id: 4,
    title: "Alimentos",
    icon: "FaPizzaSlice",
    image: "https://source.unsplash.com/600x600/?food",
  },
  {
    id: 5,
    title: "Electrónica",
    icon: "FaLaptop",
    image: "https://source.unsplash.com/600x600/?electronics",
  },
  {
    id: 6,
    title: "Hogar",
    icon: "FaHome",
    image: "https://source.unsplash.com/600x600/?home",
  },
  {
    id: 7,
    title: "Ropa",
    icon: "FaTshirt",
    image: "https://source.unsplash.com/600x600/?clothing",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 100px auto;
  overflow: hidden;

  @media (max-width: 767px) {
    display: none;
  }
`;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 90px;
`;
const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
  font-size: 24px;
  border: 1px solid #ebebeb;
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0px 4px 8px rgba(18, 70, 118, 0.14);
    border: none;
  }
`;

const LeftArrow = styled(Arrow)`
  left: 0;
`;

const RightArrow = styled(Arrow)`
  right: 0;
`;

const CategoryContainer = styled(animated.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 200px;
  width: 100%;
  gap: 50px;
  overflow: hidden;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
`;
const ContainerSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
  height: 100px;
  margin: 10px auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CarrouselCategories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Configuración de react-spring para animar la transformación del carrusel
  const springConfig = {
    mass: 1,
    tension: 200,
    friction: 26,
  };
  const { transform } = useSpring({
    transform: `translateX(-${activeIndex * 200}px)`,
    config: springConfig,
  });

  useEffect(() => {
    // Check if we are at the beginning or end of the categories array
    if (activeIndex < 0) {
      setActiveIndex(categories.length - 1);
    }

    if (activeIndex > categories.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, categories]);

  // Configuración de react-use-gesture para detectar el deslizamiento del usuario
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      const { vx } = eventData.velocity;
      const nextIndex = vx < -0.5 ? activeIndex + 2 : activeIndex + 1;
      setActiveIndex(nextIndex);
    },
    onSwipedRight: (eventData) => {
      const { vx } = eventData.velocity;
      const nextIndex = vx > 0.5 ? activeIndex - 2 : activeIndex - 1;
      setActiveIndex(nextIndex);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handlePrev = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex + 1);
  };
  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  return (
    <Container>
      <HeadContainer>
        <Title>Shop by Categories</Title>

        <ArrowContainer>
          <LeftArrow onClick={handlePrev}>{<IoIosArrowLeftXs />}</LeftArrow>
          <RightArrow onClick={handleNext}>{<IoIosArrowRightXs />}</RightArrow>
        </ArrowContainer>
      </HeadContainer>
      {isLoading && (
        <ContainerSkeleton>
          {Array.from({ length: 7 }).map((_, index) => (
            <StyledSkeleton
              key={index}
              variant="circular"
              width="100px"
              height="100px"
              animation="wave"
            />
          ))}
        </ContainerSkeleton>
      )}

      <LazyLoad height={200} width="100%" threshold={0.95} offset={300}>
        <CategoryContainer style={{ transform }} {...swipeHandlers}>
          {categories.map((category) => (
            <Category key={category.id}>
              <ImageContainer>
                <Image
                  src={category.image}
                  alt={category.title}
                  onLoad={handleImageLoaded}
                />
              </ImageContainer>
              <CategoryTitle>{category.title}</CategoryTitle>
            </Category>
          ))}
        </CategoryContainer>
      </LazyLoad>
    </Container>
  );
};
