import { createSlice } from "@reduxjs/toolkit";
import userService from "../../http/userService";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
});

export default userSlice.reducer;