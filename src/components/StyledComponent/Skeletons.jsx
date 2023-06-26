import { Skeleton } from "@mui/material";
import styled from "styled-components";

export const StyledSkeleton = styled(Skeleton)`
  && {
    background: ${(props) => props.theme.skeleton};
  }
`;
