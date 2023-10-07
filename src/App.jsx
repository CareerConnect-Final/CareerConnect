import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ReelsPage from "./components/reels/ReelsPage";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/authContext";
import { StateContext } from "./context/state";
import 'bootstrap/dist/css/bootstrap.min.css'

// function App() {
  // const {currentUser} = useContext(AuthContext);

  ////////////////////////////////////
import JobSearch from "./components/JobSearch/JobSearch";
  ///////////////////////////////
  /////////////////////////////

import { AuthContext } from "./context/auth/authContext";
import LoginPage from "./pages/loginPage/loginPage";
import CVForm from "./components/CVForm/CVForm"

function App() {
  const state = useContext(StateContext);
  const { currentUser } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  // console.log(isLoggedIn);
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
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
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoute>
          <Layout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/generate-cv",
          element: <CVForm />, 
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <LoginPage />,
    },
    {
      path: "/reels",
      element: <ReelsPage />, 
    },
    {
      path: "/jobsearch",
      element: <JobSearch />, 
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
