import { createSlice } from "@reduxjs/toolkit";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "@/utils/helper"; // Import helper functions

const initialState = {
  isAuthenticated: !!getAccessToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set the user and token when logged in
    setUser(state, action) {
      const { accessToken, refreshToken, expiresIn } = action.payload;

      // Use the helper function to store the tokens
      setAccessToken(accessToken, refreshToken, expiresIn);

      state.isAuthenticated = true;
    },
    // Clear user and token when logged out
    clearUser(state) {
      removeAccessToken();
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
