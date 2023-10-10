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
import io from "socket.io-client";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ReelsPage from "./components/reels/ReelsPage";
import Gallery from "./components/Gallery/Gallery";
import "./style.scss";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { StateContext } from "./context/state";
import ChatsPage from "./components/chats/chats";
import JobPage from "./pages/jobs/Job";
import NPost from "./components/notiPost/post";
// import "bootstrap/dist/css/bootstrap.min.css";
// function App() {
// const {currentUser} = useContext(AuthContext);

////////////////////////////////////
import JobSearch from "./components/JobSearch/JobSearch";
///////////////////////////////
/////////////////////////////

import { AuthContext } from "./context/auth/authContext";
import LoginPage from "./pages/loginPage/loginPage";
import CVForm from "./components/CVForm/CVForm";
import PrivateRoute from "./pages/loginPage/redirect";
import AuthComponent from "./components/AuthComponent /AuthComponent ";
import Main from "./components/Landing/src/Main";
function AuthenticatedLayout() {
  const { darkMode } = useContext(DarkModeContext);

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

function Reels() {
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
        {/* <Route path="/reels" element={<ReelsPage />} /> */}

        <Route path="/jobsearch" element={<JobSearch />} />
        <Route path="/landing" element={<Main />} />
        <Route path="/AuthComponent" element={<AuthComponent />} />

        <Route path="/" element={<AuthenticatedLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/post/:postId" element={<NPost />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>
        <Route path="/cv" element={<Cv />}>
          <Route index element={<CVForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
