import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  backdrop-filter: blur(100px);
  background-color: ${(props) => props.theme.backgroundContainer};
`;

export const ContainerNavBar = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundContainer};
  position: relative;
  height: 130px;
  @media (max-width: 1024px) {
    height: 85px;
  }
`;

export const ContainerSearchBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;

  @media (max-width: 767px) {
    height: 25px;
  }
`;

export const ContainerSearchBar2 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 55%;
  height: 50px;
  margin: 0 0 0 0;

  @media (max-width: 767px) {
    height: 35px;
  }
`;
export const ContainerIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto 0;
  background-color: #e30613;
  width: 40px;
  height: 100%;
  border-radius: 6px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerIcon2 = styled(ContainerIcon)`
  height: 100%;
  border-radius: 12px;
  color: white;
`;
