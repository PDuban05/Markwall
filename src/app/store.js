//store.js

import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "../features/register/registerSlice";
import authReducer from '../features/register/authSlice';
import imgReducer from '../features/cpanel/LoadImgSlice'
import UpdateReducer from '../features/cpanel/UpdateSlice'
import LinkReducer from '../features/Router/LinkSlice'

export const store = configureStore({
    reducer: {
        registerUser: createUserReducer,
        auth: authReducer,
        URLImg: imgReducer,
        update: UpdateReducer,
        link: LinkReducer

    },
});