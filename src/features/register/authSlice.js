import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, userExists, registerNewUser, emailAndPasswordExists, } from "../../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { SHA256 } from 'crypto-js';
import { v4 as uuidv4 } from "uuid";

const initialState = {
    stateUser: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStateUser: (state, action) => {
            state.stateUser = action.payload;
        },

    },
});

export const { setStateUser } = authSlice.actions;

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (_, { dispatch }) => {
        const googleProvider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, googleProvider);
            serializeUser(dispatch, result.user);

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
);

export const loginUser = (users) => async (dispatch) => {
    // Hash the password
    const hashedPassword = SHA256(users.password).toString();
    const user = {
        ...users,
    };

    try {
        const emailAndPasswordResult = await emailAndPasswordExists(user.email, hashedPassword)

        if (emailAndPasswordResult) {
            const DataUser = emailAndPasswordResult;

            localStorage.setItem('DataUser', JSON.stringify(DataUser));
            if (user.remember) {
                localStorage.setItem("remember", true);

            }


            dispatch(setStateUser("AUTHENTICATED"));
        } else {
            dispatch(setStateUser("INCORRECT_CREDENTIAL"));
        }


    } catch (error) {
        console.log(error.message)
    }
};



async function serializeUser(dispatch, user) {
    try {
        const userExistsResult = await userExists(user.uid, user.email);

        if (userExistsResult) {
            console.log(user)
            localStorage.setItem('DataUser', JSON.stringify(user));
            localStorage.setItem("remember", true);

            dispatch(setStateUser("AUTHENTICATED"));

        } else {

            if (user.emailVerified) {

                const users = {
                    ...user,
                    tokenAccess: uuidv4()
                };

                await registerNewUser({
                    uid: users.uid,
                    displayName: users.displayName,
                    email: users.email,
                    password: users.uid,
                    emailVerified: users.emailVerified,
                    photoURL: users.photoURL,
                    dateOfBirth: "",
                    tokenAccess: users.tokenAccess,

                });
                localStorage.setItem('DataUser', JSON.stringify(users));
                localStorage.setItem("remember", true);
                dispatch(setStateUser("REGISTERED_AUTHENTICATED"));

            } else {
                dispatch(setStateUser("UNVERIFIED_EMAIL"));
            }




        }
    } catch (error) {
        console.error("Error al serializar el usuario:", error);
    }
}




export const selectUser = (state) => state.auth.stateUser; // Se cambió "user" por "stateUser"

export default authSlice.reducer;
