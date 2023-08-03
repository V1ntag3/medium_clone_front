
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './views/home/Home';
import LoginRegister from './views/loginRegister/LoginRegister';
import Profile from './views/profile/Profile';


const router = createBrowserRouter([
  {
    path: "/",
    Component:Home
  },
  {
    path: "/singin",
    Component: LoginRegister
  },
  {
    path: "/profile",
    Component: Profile
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();