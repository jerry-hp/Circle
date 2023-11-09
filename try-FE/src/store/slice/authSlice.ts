import { setAuthToken } from "../../libs/api/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  full_name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      setAuthToken(payload.token);
      localStorage.setItem("token", payload.token);
      console.log(payload);

      const user = {
        id: payload.user.id,
        username: payload.user.username,
        full_name: payload.user.full_name,
        email: payload.user.email,
        profile_picture: payload.user.profile_picture,
        profile_description: payload.user.profile_description,
      };
      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;

      const user = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email,
        profile_picture: payload.profile_picture,
      };
      return user;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});
