import axios from "axios";
import React from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import base64 from "base-64";
import { createContext, useEffect, useState } from "react";
/* ---------------- */
export const AuthContext = React.createContext();
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
  const [userPost, setUserPost] = useState({});

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
    bio,
    companyName
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
      companyName: companyName,
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

  // +++++++++++++++++ get user posts+++++++++++++++++++++++

  const getUserPosts = async (userId) => {
    try {
      const authToken = cookie.load("auth");
      if (!authToken) {
        throw new Error("Authentication token not found.");
      }

      const url = `https://final-backend-nvf1.onrender.com/home/userposts/${userId}`;
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        const userPosts = response.data;
        console.log("=============>", userPosts);
        return userPosts;
      } else {
        throw new Error("Failed to fetch user posts");
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
      throw error;
    }
  };
  // ++++++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const cookieUser = cookie.load("user"); // this is not a good practice
    const token = qs.get("token") || cookieToken;
    const user = qs.get("user") || cookieUser;
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
    getUserPosts,
  };

  return (
    <AuthContext.Provider value={sharedStates}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
