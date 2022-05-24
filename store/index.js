import { configureStore } from "@reduxjs/toolkit";
import userslice from "../features/user/userslice";

export default configureStore({
  reducer: {
    user: userslice,
  },
});
