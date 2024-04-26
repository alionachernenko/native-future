import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: {
    level: [],
    motivation: [],
    topics: [],
  },
  avatar: null,
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
      console.log(action.payload)
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const onboardingActions = onboardingSlice.actions;
export const onboardingReducer = onboardingSlice.reducer;
