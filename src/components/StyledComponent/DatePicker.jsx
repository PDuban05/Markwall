import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";

export const StyledDatePicker = styled(DatePicker)`
  input {
    border: 1px solid #ebebeb;
    color: ${(props) => props.theme.text};
    border-radius: 3px;
  }
  .MuiSvgIcon-root {
    fill: ${(props) => props.theme.text};
  }

  .MuiOutlinedInput-root {
    border: 1px solid #ebebeb;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid #ebebeb;
  }
`;
