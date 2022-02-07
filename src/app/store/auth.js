import { createSlice } from '@reduxjs/toolkit';


const auth = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("userToken") || null
  },
  reducers: {
    setUser (state, action) {
      state.user = action.payload.user.email
      state.token = action.payload._tokenResponse.idToken
      localStorage.setItem("userToken", action.payload._tokenResponse.idToken)
      localStorage.setItem("user", action.payload.user.email)
    }
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;