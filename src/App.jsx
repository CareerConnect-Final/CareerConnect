import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  useNavigate,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { StateContext } from "./context/state";
// import "bootstrap/dist/css/bootstrap.min.css";
import ChatsPage from "./components/chats/chats";
import "bootstrap/dist/css/bootstrap.min.css";
import JobPage from "./pages/jobs/Job";
// function App() {
// const {currentUser} = useContext(AuthContext);

import { AuthContext } from "./context/auth/authContext";
import LoginPage from "./pages/loginPage/loginPage";
import CVForm from "./components/CVForm/CVForm";
import PrivateRoute from "./pages/loginPage/redirect";

function AuthenticatedLayout() {
  const { darkMode } = useContext(DarkModeContext);
  // console.log(isLoggedIn);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <PrivateRoute />
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
}
function Cv() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <PrivateRoute />
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  const state = useContext(StateContext);
  // const { currentUser, validateToken } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route path="/" element={<AuthenticatedLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/job" element={<JobPage />} />
        </Route>
        <Route path="/cv" element={<Cv />}>
          <Route index element={<CVForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
