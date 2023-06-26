import { createSlice } from "@reduxjs/toolkit";

export const LinkSlice = createSlice({
  name: "link",
  initialState: {
    Link: null,
    error: null,
  },
  reducers: {
    setLink: (state, action) => {
      state.Link = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLink, setError } = LinkSlice.actions;

export const StateLink = (dis) => (dispatch) => {
  dispatch(setLink(dis));
};

export default LinkSlice.reducer;
