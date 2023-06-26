import React, { useState } from "react";
import styled from "styled-components";
import {
  Label,
  TextDescription1,
  TextDescriptionValue,
  TextDiscount,
  TextPay,
  TextPay2,
  TextPercentage,
  TextPrice,
  Title2,
} from "./Text";
import { Rating, Skeleton } from "@mui/material";
import {
  StyleButtonCount,
  StyledButton3,
  StyledButton4,
  StyledButton5,
} from "./botton";
import { HiArrowUturnLefts, TbTruckDeliverys } from "./Icons";
import { useEffect } from "react";
import { formatCurrency } from "../../helpers/functions/Formatprice";
import { RViewer, RViewerTrigger } from "react-viewerjs";

import { EffectFlip, FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import { useSelector } from "react-redux";

const Containerhead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContainerBody = styled(Containerhead)`
  gap: 12px;
`;
const ContainerPromise = styled(Containerhead)`
  gap: 24px;
  margin: 80px 0 40px 0;
`;

const ContainerFooter = styled(Containerhead)`
  margin: 80px 0 0 0;
  padding: 32px;
  background-color: ${(props) => props.theme.background3};
`;

const ContainerCard = styled(Containerhead)`
  gap: 40px;
`;

const Container = styled.div`
  width: 70%;
  display: grid;
  margin: 50px auto 0 auto;
  grid-template-rows: 510px auto;
  grid-auto-columns: 60% 35%;

  @media (max-width: 767px) {
    grid-template-rows: auto auto auto auto;
    grid-auto-columns: 100%;
    width: 90%;
    margin: 0 auto 0 auto;

    gap: 20px;
  }
`;

const Container2 = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  @media (max-width: 767px) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`;

const Container3 = styled(Container2)`
  display: flex;
  flex-direction: column;
  grid-column: 2 / 3;
  grid-row: 1 / 3;

  @media (max-width: 767px) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
`;

const Container4 = styled(Container2)`
  width: 90%;
  display: flex;
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  margin: 80px 0 0 0;

  @media (max-width: 767px) {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
    width: 100%;
  }
`;

const ContainerImg = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 767px) {
    height: auto;
  }
`;
const ContainerImg2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 767px) {
    height: auto;
  }
`;

const ContainerImgNoneIsmovil = styled(ContainerImg2)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const GaleryMobile = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: column;
  }
`;

const ContainerImg3 = styled.div`
  width: 20%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  gap: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const ContainerCountImg = styled.div`
  position: absolute;
  bottom: 0;
  /* top: 0; */
  width: 100%;
  height: 90px;
  background-color: #ffffff55;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const ContainerShadow = styled(ContainerImg3)`
  position: absolute;
  width: 100%;
  gap: 0px;
`;

const Img = styled.img`
  width: 100%;
  height: 90px;
  z-index: 1;
  cursor: pointer;
  object-fit: contain;

  @media (max-width: 767px) {
    width: 100%;
    height: auto;
  }
`;

const CardShadow = styled(Img)`
  filter: blur(15px);
  -webkit-filter: blur(15px);
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.1, 0.5, 0.6, 1) 0s;
  z-index: 0;
`;

const CardShadow2 = styled(CardShadow)`
  opacity: 1;
  height: 100%;
  width: 80%;
  position: absolute;
  top: 0;

  @media (max-width: 767px) {
    height: auto;
    width: 100%;
  }
`;

const Img2 = styled(Img)`
  width: 80%;
  height: auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ContainerFlex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const ContainerFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerContador = styled.div`
  display: flex;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  align-items: center;
`;

const ContainerDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px 0 0 0;
  border-top: 1px solid #ebebeb;
`;

const Insignia = styled.div`
  width: 114px;
  height: 32px;
  background: #e30613;
  border-radius: 6px;
  color: #fcf6f6;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerIco = styled.div`
  height: 100%;
  display: flex;
  align-items: start;
`;

const SkeletonStyled = styled(Skeleton)`
  transform: translateY(50%);

  @media (max-width: 767px) {
    transform: none;
  }
`;

const ProductDetails = ({ data }) => {
  const [valueRating, setValueRating] = useState(5);
  const [count, setCount] = useState(1);
  const [dataProduct, setDataProduct] = useState([]);
  const [load, setLoad] = useState(false);
  const [imageRef, setImageRef] = useState({});
  const [imageUrls, setImageUrls] = useState([]);

  const [imageRefUrl, setImageRefUrl] = useState();
  const [imageRefIndex, setImageRefIndex] = useState();
  const stateLink = useSelector((state) => state.link.Link);

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

  useEffect(() => {
    setImageUrls([]);
    setLoad(false);
    setDataProduct([]);
    setDataProduct(data);

    if (dataProduct.length !== 0) {
      Object.entries(dataProduct[0].urlImg).forEach(([key, value]) => {
        // agregamos el par al arreglo setImageRef
        setImageRef((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      });
      const sourceImageUrl = Object.values(dataProduct[0].urlImg)[0];
      let sourceImageUrls = Object.values(dataProduct[0].urlImg);

      setImageUrls(sourceImageUrls);
      setImageRefUrl(sourceImageUrl);
      setValueRating(dataProduct[0].rating);

      setLoad(true);
    }
  }, [data, dataProduct]);

  const handleImg = (e) => {
    setImageRefUrl(e.target.src);
    setImageRefIndex(e.target.id);
  };

  const handleIndex = (e) => {
    setImageRefIndex(e.target.id);
  };
  return (
    <Container>
      <Container2>
        <ContainerImg>
          <ContainerImg3>
            {imageUrls ? (
              <RViewer imageUrls={imageUrls}>
                {imageUrls.slice(0, 5).map((imagen, index) => {
                  return (
                    <React.Fragment key={index}>
                      <RViewerTrigger index={index}>
                        <Img
                          id={index}
                          src={imagen}
                          onMouseEnter={handleImg}
                          style={{
                            border:
                              imagen === imageRefUrl
                                ? "2px solid #e30613"
                                : "none",
                            filter: index === 4 ? "contrast(0.3) " : "none",
                            position: index === 4 ? "relative " : "inherit",
                          }}
                        />
                      </RViewerTrigger>

                      {index === 4 && (
                        <ContainerCountImg>
                          {`+${imageUrls.length - 4} más`}
                        </ContainerCountImg>
                      )}
                    </React.Fragment>
                  );
                })}
              </RViewer>
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="500px"
                animation="wave"
              />
            )}

            <ContainerShadow>
              {load ? (
                imageUrls.slice(0, 5).map((imagen, index) => (
                  <CardShadow
                    key={index}
                    src={imagen}
                    style={{
                      opacity: imagen === imageRefUrl ? "1" : "0",
                    }}
                  />
                ))
              ) : (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="120px"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="120px"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="120px"
                    animation="wave"
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="120px"
                    animation="wave"
                  />
                </>
              )}
            </ContainerShadow>
          </ContainerImg3>

          <ContainerImg2>
            {load ? (
              <>
                <ContainerImgNoneIsmovil>
                  <CardShadow2 src={imageRefUrl} />

                  <RViewer imageUrls={imageUrls}>
                    <RViewerTrigger index={imageRefIndex}>
                      <Img2 src={imageRefUrl} />
                    </RViewerTrigger>
                  </RViewer>
                </ContainerImgNoneIsmovil>

                <GaleryMobile>
                  <RViewer imageUrls={imageUrls}>
                    <Swiper
                      effect={"flip"}
                      grabCursor={true}
                      modules={[EffectFlip, Pagination]}
                      pagination={{
                        type: "progressbar",
                      }}
                      className="mySwiper"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    >
                      {imageUrls.map((imagen, index) => (
                        <RViewerTrigger key={index} index={index}>
                          <SwiperSlide>
                            <Img
                              src={imagen}
                              id={index}
                              onClick={handleIndex}
                            />
                          </SwiperSlide>
                        </RViewerTrigger>
                      ))}
                    </Swiper>
                  </RViewer>
                </GaleryMobile>
              </>
            ) : (
              <SkeletonStyled
                variant="rectangular"
                width="80%"
                height={250}
                animation="wave"
              />
            )}
          </ContainerImg2>
        </ContainerImg>
      </Container2>

      <Container3>
        <Containerhead>
          {dataProduct[0]?.name ? (
            <Title2>{dataProduct[0].name}</Title2>
          ) : (
            <Skeleton width={"90%"} height={50} />
          )}

          <ContainerFlex>
            <Rating
              name="read-only"
              value={valueRating}
              precision={0.1}
              readOnly
            />
            <Label>(8) review </Label>
            <Insignia>Best seller</Insignia>
          </ContainerFlex>
        </Containerhead>
        <ContainerFlex style={{ margin: " 32px 0 " }}>
          {dataProduct[0]?.price ? (
            <>
              <TextDescription1>Price:</TextDescription1>
              {dataProduct[0].discount && dataProduct[0].discount !== "0" ? (
                <>
                  <TextDiscount>
                    {formatCurrency(dataProduct[0].price, "USD")}
                  </TextDiscount>
                  <TextPrice>
                    {formatCurrency(
                      dataProduct[0].price -
                        (dataProduct[0].price *
                          parseFloat(dataProduct[0].discount)) /
                          100,
                      "USD"
                    )}
                  </TextPrice>
                  <TextPercentage>
                    ( {dataProduct[0].discount} % OFF)
                  </TextPercentage>
                </>
              ) : (
                <TextPrice>
                  {formatCurrency(
                    dataProduct[0].price -
                      (dataProduct[0].price *
                        parseFloat(dataProduct[0].discount)) /
                        100,
                    "USD"
                  )}
                </TextPrice>
              )}
            </>
          ) : (
            <Skeleton width={"60%"} height={50} />
          )}
        </ContainerFlex>
        <ContainerBody>
          <ContainerFlex>
            {dataProduct[0]?.color ? (
              <>
                <TextDescription1>color :</TextDescription1>
                <TextDescriptionValue>
                  {dataProduct[0].color}
                </TextDescriptionValue>
              </>
            ) : (
              <Skeleton width={"20%"} height={50} />
            )}
          </ContainerFlex>

          {dataProduct[0]?.size ? (
            <ContainerFlex>
              <TextDescription1>Size :</TextDescription1>
              <TextDescriptionValue>{dataProduct[0].size}</TextDescriptionValue>
            </ContainerFlex>
          ) : (
            <Skeleton width={"20%"} height={50} />
          )}

          <ContainerFlex>
            <TextDescription1>quantity :</TextDescription1>
            <ContainerContador>
              <StyleButtonCount name="-" onClick={handleCount}>
                -
              </StyleButtonCount>
              <TextDescription1> {count} </TextDescription1>
              <StyleButtonCount name="+" onClick={handleCount}>
                +
              </StyleButtonCount>
            </ContainerContador>
          </ContainerFlex>
        </ContainerBody>

        <ContainerPromise>
          <ContainerFlex style={{ flexWrap: "nowrap" }}>
            <ContainerIco>
              <TbTruckDeliverys />
            </ContainerIco>

            <ContainerFlexColumn>
              <TextDescriptionValue>Shipping nationwide</TextDescriptionValue>
              <TextDescription1>
                Know the times and forms of shipping.
              </TextDescription1>
            </ContainerFlexColumn>
          </ContainerFlex>

          <ContainerFlex style={{ flexWrap: "nowrap" }}>
            <ContainerIco>
              <HiArrowUturnLefts />
            </ContainerIco>

            <ContainerFlexColumn>
              <TextDescriptionValue>Free Return</TextDescriptionValue>
              <TextDescription1>
                You have 30 days from when you receive it.
              </TextDescription1>
            </ContainerFlexColumn>
          </ContainerFlex>
        </ContainerPromise>

        <ContainerFlex style={{ flexWrap: "wrap" }}>
          <a target="_blank" href={dataProduct[0]?.link}>
            <StyledButton4>Buy now</StyledButton4>
          </a>

          <StyledButton5>Add to cart</StyledButton5>
        </ContainerFlex>

        <ContainerFooter>
          <TextPay>Payment methods</TextPay>

          <TextPay2>Credit cards</TextPay2>
          <TextDescription1>Pay in up to 10 instalments!</TextDescription1>

          <ContainerCard>
            <ContainerFlex>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Fcards%2Faa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg?alt=media&token=77800a88-a3c0-4aa4-a6a8-d54951cab175"
                alt=""
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Fcards%2Fa5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg?alt=media&token=b54c50f1-2c13-4f1f-bd76-9bead02f0beb"
                alt=""
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Fcards%2Fb2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg?alt=media&token=cbaa0768-3c27-4110-b597-afc8882f4691"
                alt=""
              />

              <img
                src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Fcards%2F751ea930-571a-11e8-9a2d-4b2bd7b1bf77-m.svg?alt=media&token=3b21a57d-6b56-4602-97f6-b2791f96f943"
                alt=""
              />
            </ContainerFlex>

            <ContainerFlex>
              <ContainerFlex>
                <TextPay2>Cash</TextPay2>
              </ContainerFlex>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Fcards%2Fe5ee1d00-f39b-11eb-8e0d-6f4af49bf82e-m.svg?alt=media&token=65455712-58b7-43d5-83cb-f514b1a67419"
                alt=""
              />
            </ContainerFlex>
          </ContainerCard>
        </ContainerFooter>
      </Container3>

      <Container4>
        <div style={{ display: "none" }}>
          <Title2 style={{ margin: "0 0 24px  0" }}>main features</Title2>

          <ContainerFlex style={{ margin: "0 0 16px 0 " }}>
            <TextDescription1>Brand : </TextDescription1>
            <TextDescriptionValue>Generic</TextDescriptionValue>
          </ContainerFlex>
          <ContainerFlex style={{ margin: "0 0 40px 0 " }}>
            <TextDescription1>Model : </TextDescription1>
            <TextDescriptionValue>
              Samsung Watch 4 / 4 Classic
            </TextDescriptionValue>
          </ContainerFlex>

          <TextPay2 style={{ margin: "0 0 24px 0 " }}>Other</TextPay2>

          <ContainerFlex style={{ gap: "40px", margin: "0 0 56px 0 " }}>
            <ContainerFlexColumn>
              <TextDescription1>Output voltage:</TextDescription1>
              <TextDescriptionValue>5V</TextDescriptionValue>
            </ContainerFlexColumn>

            <ContainerFlexColumn>
              <TextDescription1>Cable length:</TextDescription1>
              <TextDescriptionValue>100cm</TextDescriptionValue>
            </ContainerFlexColumn>

            <ContainerFlexColumn>
              <TextDescription1>Is it wireless:</TextDescription1>
              <TextDescriptionValue>yes</TextDescriptionValue>
            </ContainerFlexColumn>
          </ContainerFlex>
        </div>

        <ContainerDescription>
          <Title2>Description</Title2>

          {dataProduct[0]?.description ? (
            <TextDescription1 style={{ textAlign: "left" }}>
              {dataProduct[0].description}
            </TextDescription1>
          ) : (
            <Skeleton width={"90%"} height={200} />
          )}
        </ContainerDescription>
      </Container4>
    </Container>
  );
};

export default ProductDetails;
