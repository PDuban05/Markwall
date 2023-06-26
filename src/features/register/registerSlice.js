import { createSlice } from "@reduxjs/toolkit";
import { db, emailExists, registerNewUser, userExists } from "../../firebase/firebase";
import { SHA256 } from 'crypto-js';
import { setStateUser } from "./authSlice";
import { v4 as uuidv4 } from "uuid";


export const createUserSlice = createSlice({
  name: "registerUser",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = createUserSlice.actions;

export const register = (users) => async (dispatch) => {
  // Hash the password
  const hashedPassword = SHA256(users.password).toString();
  const user = {
    ...users,
    uid: uuidv4(),
    password: hashedPassword,
    tokenAccess: uuidv4(),

  };

  try {
    const emailExistsResult = await emailExists(user.email)

    if (emailExistsResult) {
      dispatch(setStateUser("EXISTING_EMAIL"));

    } else {


      await registerNewUser({
        uid: user.uid,
        displayName: user.displayName,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        password: user.password,
        emailVerified: "false",
        photoURL: "",
        tokenAccess: user.tokenAccess,
      });

      localStorage.setItem('DataUser', JSON.stringify(user));
      localStorage.setItem("remember", true);


      dispatch(setStateUser("REGISTERED_AUTHENTICATED"));
    }


  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default createUserSlice.reducer;
