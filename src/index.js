import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StartPage } from "./features/init/pages/StartPage";
import { Login } from "./features/authentication/pages/Login";
import { SignUp } from "./features/authentication/pages/SignUp";
import { Advantages } from "./features/advantages/pages/Advantages";
import { Onboarding } from "./features/onboarding/pages/Onboarding";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Home } from "./home/pages/Home";
import { Main } from "./home/pages/Main";
import { Words } from "./home/pages/Words";
import { Grammar } from "./home/pages/Grammar";
import { Chat } from "./home/pages/Chat";
import { Settings } from "./features/settings/pages/Settings";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Advantages />,
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
  { path: "onboarding", element: <Onboarding /> },
  { path: "settings", element: <Settings /> },


  {
    path: "home",
    element: <Home />,
    children: [
      { path: "main", element: <Main /> },
      { path: "words", element: <Words /> },
      { path: "grammar", element: <Grammar /> },
      { path: "chat", element: <Chat /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
