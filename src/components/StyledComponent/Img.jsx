import styled from "styled-components";

export const StyledImg = styled.img`
  filter: invert(${(props) => props.theme.icon});

  @media (max-width: 480px) {
    width: 50px;
    object-fit: contain;
  }
`;
export const StyledImg1 = styled.img`
  width: 30%;
`;
