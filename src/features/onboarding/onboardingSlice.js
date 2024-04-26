import { createSlice } from "@reduxjs/toolkit";
import defaultAvatar from "../../assets/avatars/Avatar-11.png";

const initialState = {
  questions: {
    level: [],
    motivation: [],
    topics: [],
  },
  avatar: {
    image: defaultAvatar,
    alt: "Бджола",
    id: "Avatar-11",
  },
  settings: {
    dyslexia_mode: false,
    listening_exercises: true,
    contrast_mode: false,
  },
  username: "",
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.questions.level = action.payload;
    },
    setMotivation: (state, action) => {
      state.questions.motivation = action.payload;
    },
    setTopics: (state, action) => {
      state.questions.topics = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
      console.log(action.payload);
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const onboardingActions = onboardingSlice.actions;
export const onboardingReducer = onboardingSlice.reducer;
