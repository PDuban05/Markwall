import React, { useState, useEffect } from "react"; // Import React and useState hook
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks from react-redux
import { register } from "../features/register/registerSlice"; // Import register action from registerSlice
import validatePassword from "../helpers/functions/validatePassword"; // Import password validation function
import dayjs from "dayjs"; // Import dayjs library for handling dates
import ThemeProvider from "./StyledComponent/theme/ThemeProvider";
import ThemeSelector from "./StyledComponent/theme/ThemeSelector";
import { StyledButton, StyledButton2 } from "./StyledComponent/botton";
import {
  Container,
  ContainerIcon,
  ContainerNavBar,
  ContainerSearchBar,
} from "./StyledComponent/Container";
import {
  ContainerForm,
  ContainerImg,
  Containerdiv,
  Form,
  QuickAccess,
  SpanQuickAcces,
} from "./StyledComponent/Login/Container";
import { H1, Label } from "./StyledComponent/Text";
import { SearchBar, StyledTextField } from "./StyledComponent/Inputs";
import {
  AiFillEyeInvisibles,
  AiFillEyes,
  BsSearchs,
  StyledIconGoogle,
} from "./StyledComponent/Icons";
import AnimatedImages from "./StyledComponent/BouncingImage";
import { StyledDatePicker } from "./StyledComponent/DatePicker";
import {
  ContainerTerms,
  LabelTerms,
  LinkTerms,
} from "./StyledComponent/Login/CheckTerms";
import { StyledCheckbox } from "./StyledComponent/CheckBox";
import { StyledAlert } from "./StyledComponent/Alert";
import { loginWithGoogle, setStateUser } from "../features/register/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledImg } from "./StyledComponent/Img";

const ContainerRegister = styled(Container)`
  && {
    width: 50%;
    overflow: hidden;

    @media (max-width: 767px) {
      width: 90%;
    }
  }
`;

const ContainerFormRegister = styled(ContainerForm)`
  && {
    width: 50%;

    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

const ContainerDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 767px) {
    gap: 0px;
  }
`;

const ContainerBtn = styled.div`
  display: flex;
  gap: 25px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const ContainerNavBarLogin = styled(ContainerNavBar)`
  && {
    align-items: center;
    justify-content: center;
    padding: 20px 7%;
    margin: 0 0 20px 0;
  }
`;

const ContainerImgRegister = styled(ContainerImg)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const StyledContainerSearchBar = styled(ContainerSearchBar)`
  && {
    width: 50%;
  }
`;

const Register = () => {
  // Define Register component
  const dispatch = useDispatch(); // Create a dispatch function to dispatch actions
  const error = useSelector((state) => state.registerUser.error); // Get error from the registerUser state
  const stateUser = useSelector((state) => state.auth.stateUser);
  const [errorcatch, setErrorCatch] = useState();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(dayjs()); // Set the initial state for the date picker
  const [form, setForm] = useState({
    // Set the initial state for the form
    displayName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Set the initial state for showPassword to false

  const [checked, setChecked] = useState(false);

  function handleCheckboxChange(event) {
    setChecked(event.target.checked);
  }

  const handleChange = (e) => {
    // Handle input change
    const { name, value } = e.target; // Destructure the input name and value
    if (name === "name" || name === "lastName") {
      // Check if the input is the name or the last name
      const regex = /^[a-zA-Z\s]*$/; // Define a regex for the input to only accept letters and spaces
      if (!regex.test(value)) {
        // If the input value doesn't match the regex, return
        return;
      }
    }
    setForm({ ...form, [name]: value }); // Update the form state with the new input value
  };

  const handleDateChange = (date) => {
    // Handle date change
    setSelectedDate(date); // Update the selected date state
    setForm({ ...form, dateOfBirth: date.format("YYYY-MM-DD") }); // Update the form state with the selected date in the correct format
  };

  const handleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const handleSubmit = (e) => {
    // Handle form submission
    e.preventDefault(); // Prevent default form submission
    setErrorCatch(null);
    switch (true) {
      case !form.dateOfBirth:
        // If the date of birth is empty, show an alert
        setErrorCatch("Debes ingresar tu fecha de nacimiento");
        break;
      case !validatePassword(form.password):
        // If the password doesn't meet the requirements, show an alert
        setErrorCatch("La contraseña debe contener al menos 8 caracteres");
        break;
      case dayjs(form.dateOfBirth) > dayjs().subtract(18, "year"):
        // If the user is younger than 18, show an alert
        setErrorCatch("Debes ser mayor de 18 años para registrarte");
        break;
      case !checked:
        setErrorCatch("Debes aceptar los términos y condiciones");
        break;
      default: // Dispatch the register action with the form data
        dispatch(register(form));
        break;
    }
  };

  useEffect(() => {
    setErrorCatch(null);

    switch (stateUser) {
      case "AUTHENTICATED":
      case "REGISTERED_AUTHENTICATED":
        navigate("/");
        break;
      case "UNVERIFIED_EMAIL":
        setErrorCatch(
          "Debes verificar tu cuenta de Google antes de registrarte"
        );
        break;
      case "EXISTING_EMAIL":
        setErrorCatch(
          "Ya existe una cuenta con el correo que estas utilizando"
        );
        break;
      default:
        // handle default case here
        break;
    }
  }, [stateUser]);

  return (
    <ThemeProvider>
      <ContainerDiv>
        <ContainerNavBarLogin>
          <ContainerHead>
            <Link to="/">
              <StyledImg src="https://firebasestorage.googleapis.com/v0/b/tienda-e-commerce-55251.appspot.com/o/icons%2Flogo.svg?alt=media&token=d05ea4b4-ef50-4988-a912-633bf8c89cd3" />
            </Link>
            <StyledContainerSearchBar>
              <SearchBar id="search-bar" placeholder="Search products" />
              <ContainerIcon>
                <BsSearchs />
              </ContainerIcon>
            </StyledContainerSearchBar>

            <ContainerBtn>
              <Link to="/login">
                <StyledButton2>Login</StyledButton2>
              </Link>
            </ContainerBtn>
            <ThemeSelector />
          </ContainerHead>
        </ContainerNavBarLogin>

        <ContainerRegister>
          <ContainerImgRegister />

          <ContainerFormRegister>
            <AnimatedImages />
            <H1>Registro</H1>
            {error && <p>{error}</p>}
            <Form onSubmit={handleSubmit}>
              <Containerdiv>
                <StyledTextField
                  label="Nombre Completo"
                  name="displayName"
                  type="text"
                  value={form.displayName}
                  onChange={handleChange}
                  required
                />
              </Containerdiv>

              <Containerdiv>
                <StyledTextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Containerdiv>
              <Containerdiv>
                <Label> Fecha de nacimiento </Label>

                <StyledDatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Containerdiv>
              <Containerdiv>
                <StyledTextField
                  label="Contraseña Nueva"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                ></StyledTextField>
                <label onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisibles /> : <AiFillEyes />}
                </label>
              </Containerdiv>
              {/* <StyledAlert severity="error">error</StyledAlert> */}
              {errorcatch ? (
                <StyledAlert severity="error"> {errorcatch} </StyledAlert>
              ) : null}
              <ContainerTerms>
                <StyledCheckbox
                  id="check"
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                <LabelTerms htmlFor="check">
                  Al hacer clic, aceptas las
                  <LinkTerms target="_blank"> Condiciones</LinkTerms>, la
                  <LinkTerms target="_blank">Política de privacidad</LinkTerms>y
                  la
                  <LinkTerms target="_blank"> Política de cookies</LinkTerms> .
                </LabelTerms>
              </ContainerTerms>
              <StyledButton variant="contained" type="submit">
                Create a Free Account
              </StyledButton>
              <QuickAccess>
                <SpanQuickAcces />
                <Label>Acceso rápido</Label>
                <SpanQuickAcces />
              </QuickAccess>

              <QuickAccess>
                <StyledIconGoogle onClick={handleLogin} />
              </QuickAccess>
            </Form>
          </ContainerFormRegister>
        </ContainerRegister>
      </ContainerDiv>
    </ThemeProvider>
  );
};

export default Register;
