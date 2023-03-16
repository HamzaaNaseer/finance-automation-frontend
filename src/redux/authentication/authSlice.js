// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userLogin, loadUser } from "./authAction";

const initialState = {
  loading: false,
  user: null, // for user object
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userToken");
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
      state.isAuthenticated = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload;
    },
    [loadUser.pending]: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
      state.isAuthenticated = true;
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = payload.message;
    },
  },
});
export const { clearErrors, logout } = userSlice.actions;
export default userSlice.reducer;
