import { configureStore } from "@reduxjs/toolkit";
import { onboardingReducer } from "../features/onboarding/onboardingSlice";
import { userReducer } from "../user/userSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    user: userReducer
  },
});
