import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserDataApi, signOutApi } from "./userapi";
const initialState = {
  address: "",
  connected: false,
  institution: [],
  balance: "",
  status: "idle",
};
export const authUser = createAsyncThunk("user/autUser", async () => {
  const res = await fetchUserDataApi();
  if (res.error) {
    return res;
  }
  return res;
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.connected = false;
      state = { ...initialState };
      signOutApi();
    },
    signIn: (state, action) => {
      state.connected = true;
      state.address = action.payload.account;
      state.balance = action.payload.balance;
      // state.institution = action.payload.institution;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.rejected, (state, _action) => {
        state.status = "error";
      })
      .addCase(authUser.pending, (state, _action) => {
        state.status = "loading";
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.connected = true;
        state.address = action.payload.account;
        state.balance = action.payload.balance;
      });
  },
});

export const selectUser = (state) => state.user;
export const { signOut, signIn } = userSlice.actions;
export default userSlice.reducer;
