import { CircularProgress, LinearProgress, Stack } from "@mui/material";
import React from "react";
import styled from "styled-components";
import AnimatedImages from "../BouncingImage";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  backdrop-filter: blur(100px);
`;

const Loading = () => {
  return (
    <Container>
      <Stack sx={{ color: "grey.500" }}>
        <CircularProgress color="inherit" />
      </Stack>
    </Container>
  );
};

export default Loading;
