import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserDataApi,
  signOutApi,
  registerCertificateApi,
  getUserCertsApi,
  getCertAPi,
} from "./userapi";
const initialState = {
  address: "",
  connected: false,
  institution: "",
  balance: "",
  image: "",
  status: "idle",
  certificates: [],
  currentCert: {},
  searchResult: [],
};
export const authUser = createAsyncThunk("user/autUser", async (formData) => {
  const res = await fetchUserDataApi(formData);
  if (res.error) {
    return res;
  }
  return res;
});

export const registerCertificate = createAsyncThunk(
  "user/certreg",
  async (formData) => {
    const res = await registerCertificateApi(formData);
    if (res.error) {
      return res;
    }
    return res;
  }
);

export const getUserCertificates = createAsyncThunk(
  "user/getcerts",
  async () => {
    const res = await getUserCertsApi();
    if (res.error) {
      return res;
    }
    return res;
  }
);
export const getCertificate = createAsyncThunk("user/getcert", async (id) => {
  const res = await getCertAPi(id);
  if (res.error) {
    return res;
  }
  return res;
});
export const searchCert = createAsyncThunk("user/search", async (id) => {
  const res = await getCertAPi(id);
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
      state.institution = action.payload.institution;
      state.image = action.payload.image;
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
        state.institution = action.payload.institution;
        state.image = action.payload.image;
      })
      .addCase(registerCertificate.fulfilled, (state, action) => {
        state.currentCert = action.payload;
      })
      .addCase(getUserCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload;
      })
      .addCase(getCertificate.fulfilled, (state, action) => {
        state.currentCert = action.payload;
      })
      .addCase(searchCert.fulfilled, (state, action) => {
        if (action.payload.certName !== "") {
          state.searchResult = [action.payload];
        } else {
          state.searchResult = "";
        }
      });
  },
});

export const selectUser = (state) => state.user;
export const { signOut, signIn } = userSlice.actions;
export default userSlice.reducer;
