import { createSlice } from "@reduxjs/toolkit";

export const createImgSlice = createSlice({
  name: "uploadimg",
  initialState: {
    URL: null,
    error: null,
  },
  reducers: {
    setURL: (state, action) => {
      state.URL = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setURL, setError } = createImgSlice.actions;

export const StateImgUrl = (URL) => (dispatch) => {
  dispatch(setURL(URL));
};

export default createImgSlice.reducer;
