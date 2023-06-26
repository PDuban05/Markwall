import { createSlice } from "@reduxjs/toolkit";

export const UpdateSlice = createSlice({
    name: "update",
    initialState: {
        Update: null,
        error: null,
    },
    reducers: {
        setUpdate: (state, action) => {
            state.Update = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUpdate, setError } = UpdateSlice.actions;

export const StateUpdate = (dis) => (dispatch) => {
    dispatch(setUpdate(dis));
};

export default UpdateSlice.reducer;
