import React from "react";
import styled from "styled-components";

export const ContainerTerms = styled.div`
  display: flex;
  align-items: center;
`;

export const LabelTerms = styled.label`
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  color: ${(props) => props.theme.text};
`;

export const LinkTerms = styled.a`
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  color: #2365eb;
`;
