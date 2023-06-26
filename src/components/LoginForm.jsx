import React, { useState, useEffect } from "react"; // Import React and useState hook
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks from react-redux
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
import { ContainerTerms, LabelTerms } from "./StyledComponent/Login/CheckTerms";
import { StyledCheckbox } from "./StyledComponent/CheckBox";
import { StyledAlert } from "./StyledComponent/Alert";
import {
  loginUser,
  loginWithGoogle,
  setStateUser,
} from "../features/register/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "./StyledComponent/NavBar";
import { StyledImg } from "./StyledComponent/Img";

const ContainerLogin = styled(Container)`
  && {
    width: 25%;

    @media (max-width: 767px) {
      width: 90%;
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

const StyledContainerSearchBar = styled(ContainerSearchBar)`
  && {
    width: 50%;
  }
`;

const Login = () => {
  // Define Register component
  const dispatch = useDispatch(); // Create a dispatch function to dispatch actions
  const error = useSelector((state) => state.registerUser.error); // Get error from the registerUser state
  const stateUser = useSelector((state) => state.auth.stateUser);
  const [errorcatch, setErrorCatch] = useState();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Set the initial state for the form
    remember: false,
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Set the initial state for showPassword to false

  const [checked, setChecked] = useState(false);

  function handleCheckboxChange(event) {
    setChecked(event.target.checked);
    setForm({ ...form, remember: event.target.checked });
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setForm({ ...form, [name]: name === "remember" ? checked : value });
  };

  const handleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const handleSubmit = (e) => {
    // Handle form submission
    e.preventDefault(); // Prevent default form submission
    setErrorCatch(null);
    dispatch(loginUser(form));
  };

  useEffect(() => {
    setErrorCatch(null);
    switch (stateUser) {
      case "AUTHENTICATED":
      case "REGISTERED_AUTHENTICATED":
        navigate("/");
        break;
      case "INCORRECT_CREDENTIAL":
        setErrorCatch("Credenciales incorrectas");
        break;

      default:
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
              <Link to="/register">
                <StyledButton2>Crea tu cuenta</StyledButton2>
              </Link>
            </ContainerBtn>
            <ThemeSelector />
          </ContainerHead>
        </ContainerNavBarLogin>

        <ContainerLogin>
          <ContainerForm>
            <AnimatedImages />
            <H1>Iniciar Sesión</H1>
            {error && <p>{error}</p>}
            <Form onSubmit={handleSubmit}>
              <Containerdiv>
                <StyledTextField
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  label="Email"
                />
              </Containerdiv>

              <Containerdiv>
                <StyledTextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  label="Contraseña"
                />
                <label onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisibles /> : <AiFillEyes />}
                </label>
              </Containerdiv>

              {errorcatch ? (
                <StyledAlert severity="error"> {errorcatch} </StyledAlert>
              ) : null}

              <ContainerTerms>
                <StyledCheckbox
                  id="check"
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                <LabelTerms htmlFor="check">Recordar Sesión.</LabelTerms>
              </ContainerTerms>

              <StyledButton variant="contained" type="submit">
                Ingresar
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
          </ContainerForm>
        </ContainerLogin>
      </ContainerDiv>
    </ThemeProvider>
  );
};

export default Login;
