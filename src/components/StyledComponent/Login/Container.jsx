import styled from "styled-components";

export const ContainerForm = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 30px;
  gap: 20px;
`;

export const ContainerImg = styled.div`
  width: 50%;
  height: auto;
  margin: 0;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/Imagen1.png?alt=media&token=a4b1bb00-3852-4cf4-a697-e5e533c8cf1a");
  background-size: cover;
`;

export const Containerdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const QuickAccess = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3%;
`;
export const SpanQuickAcces = styled.span`
  width: 30%;
  border-top: 1px solid ${(props) => props.theme.text};
`;
