import axios from "axios";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import base64 from "base-64";
import { createContext, useEffect, useState } from "react";
/* ---------------- */
export const AuthContext = createContext();
/* ---------------- */

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setUser] = useState({
    id: 1,
    name: "John Doe",
    profilePic:
      "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
  });
  const [error, setError] = useState(null);
  const [token, setToken] = useState(undefined);

  let signup = async (
    username,
    password,
    role,
    email,
    firstName,
    lastName,
    dateOfBirth,
    country,
    city,
    phoneNumber,
    address,
    gender,
    profilePicture,
    imageForCover,
    career,
    bio
  ) => {
    const obj = {
      username: username,
      password: password,
      role: role,
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: dateOfBirth,
      country: country,
      city: city,
      phoneNumber: phoneNumber,
      address: address,
      gender: gender,
      profilePicture: profilePicture,
      imageForCover: imageForCover,
      career: career,
      bio: bio,
      employed: false,
    };
    console.log(obj);
    try {
      const url = `https://final-backend-nvf1.onrender.com/signup`;
      const res = await axios.post(url, obj);
      console.log(res.data);
      console.log("successful hit");
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.error(e);
      console.log("bad hit");
    }
  };

  const login = async (username, password) => {
    console.log("login clicked", username, password);
    try {
      const token = base64.encode(`${username}:${password}`);
      const response = await axios.post(
        "https://final-backend-nvf1.onrender.com/signin",
        null,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      validateToken(response.data.token, response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const validateToken = async (token, user) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, user);
      console.log("validating the token", validUser);
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log("Token Validation Error", e);
    }
  };

  const setLoginState = async (loggedIn, Token, User, error) => {
    setIsLoggedIn(loggedIn);
    setToken(Token);
    setUser(User);
    setError(error || null);
    cookie.save("auth", Token);
    cookie.save("user", User);
  };
  const logout = () => {
    setLoginState(false, null, {});
  };
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const cookieUser = cookie.load("user"); // this is not a good practice
    const token = qs.get("token") || cookieToken || null;
    const user = qs.get("user") || cookieUser || null;
    console.log("user from cookie", user);
    console.log("hi");
    validateToken(token, user);
  }, []);

  const sharedStates = {
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    signup,
    login,
    currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={sharedStates}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
