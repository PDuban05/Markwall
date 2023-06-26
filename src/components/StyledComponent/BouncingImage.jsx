import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";

const Image = styled(animated.img)`
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(1rem);
  overflow: hidden;
`;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedImages = () => {
  const [image1Props, setImage1Props] = useSpring(() => ({
    x: 0,
    y: 0,
    config: config.default,
  }));
  const [image2Props, setImage2Props] = useSpring(() => ({
    x: 0,
    y: 0,
    config: config.default,
  }));

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  // const moveImages = () => {
  //   const containerWidth = image1Ref?.current?.parentNode?.clientWidth; // Obtener el ancho del contenedor
  //   const containerHeight = image1Ref?.current?.parentNode?.clientHeight; // Obtener la altura del contenedor
  //   const imageWidth = 200;
  //   const imageHeight = 200;

  //   const containerWidth2 = containerWidth;
  //   const containerHeight2 = containerHeight;

  //   const x1 = getRandomNumber(0, containerWidth - imageWidth);
  //   const y1 = getRandomNumber(0, containerHeight - imageHeight);

  //   const x2 = getRandomNumber(0, containerWidth2 - imageWidth);
  //   const y2 = getRandomNumber(0, containerHeight2 - imageHeight);

  //   setImage1Props({
  //     x: x1,
  //     y: y1,
  //     config: { duration: 9000 },
  //     onRest: () => {
  //       moveImages();
  //     },
  //   });

  //   setImage2Props({
  //     x: x2,
  //     y: y2,
  //     config: { duration: 9000 },
  //   });
  // };

  // useEffect(() => {
  //   moveImages();
  // }, []);

  return (
    <>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/ball%2Fball1.svg?alt=media&token=4c90934d-ffc8-48a4-a9c3-6938554b7d0c"
        style={image1Props}
        ref={image1Ref}
      />
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/ball%2Fball2.svg?alt=media&token=423564e0-4fa0-49d4-a858-0b5a15181d22"
        style={image2Props}
        ref={image2Ref}
      />
    </>
  );
};

export default AnimatedImages;
