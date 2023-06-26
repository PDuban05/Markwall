// components/Button.js
import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    background-color: transparent;
    .MuiInputBase-input {
      color: ${(props) => props.theme.text};
      font-size: 14px;
      font-weight: 400;
      font-family: "Inter", sans-serif;
    }
    fieldset {
      border: 1px solid #ebebeb;
    }
  }

  label {
    color: ${(props) => props.theme.text};
  }

  input:-webkit-autofill,
  .MuiInputBase-root:has(> input:-webkit-autofill) {
    background-color: #8e8ed62b;
    -webkit-text-fill-color: ${(props) => props.theme.text};
  }
`;

export const StyledTextField1 = styled(StyledTextField)`
  && {
    width: 45%;
  }
`;

export const StyledTextField2 = styled(StyledTextField)`
  && {
    width: 100%;
  }
`;

export const StyledTextField3 = styled(StyledTextField)`
  && {
    width: 276px;
    height: 44px;
  }
`;

export const SearchBar = styled.input`
  background-color: #8e8ed62b;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  padding: 8px 12px;
  width: 100%;
  height: 100%;
  position: relative;
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: 400;
  font-family: "Inter", sans-serif;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus-within {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const SearchBar2 = styled(SearchBar)`
  border-radius: 12px;
  height: 100%;
  color: white;
`;
