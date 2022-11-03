import axios from "axios";
import { createContext, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

export const AuthContext = createContext();

const url = "http://127.0.0.1:8000/";

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('username') || false);
  const [myKey, setMyKey] = useState(window.atob(sessionStorage.getItem('token')) || false);

  const createUser = async (email, password, firstName, lastName, userName, navigate) => {
    try {
      const res = await axios.post(`${url}users/register/`, {
        username: userName,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        password1: password,
      });

      if (res.data.token) {
        console.log(res);
        setMyKey(res.data.token);
        setCurrentUser(res.data.username);
        sessionStorage.setItem("username", res.data.username);
        const myToken = window.btoa(res.data.token);
        sessionStorage.setItem("token", myToken);
        toastSuccessNotify("User registered successfully!");
        navigate("/")
      }
    } catch (error) {
      toastErrorNotify("Something went wrong!");
    }
  };

  // ----- Postman Config -----
  // var axios = require('axios');
  //       var data = {
  //         "username": userName,
  //         "email": email,
  //         "first_name": firstName,
  //         "last_name": lastName,
  //         "password": password,
  //         "password1": password
  //       };
  // console.log(data);

  // var config = {
  //   method: 'post',
  //   url: 'http://127.0.0.1:8000/users/register/',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Cookie': 'csrftoken=uXl1MDBi9uTkDLeQDtuPNa23IB8pPTWu'
  //   },
  //   data : data
  // };

  // const res =  await axios(config)

  const signIn = async (email, password, userName, navigate) => {
    try {
      const res = await axios.post(`${url}users/auth/login/`, {
        username: userName,
        email: email,
        password: password,
      });
      console.log(res);
      
      if (res.data.key) {
        console.log(res);
        setMyKey(res.data.key);
        setCurrentUser(res.data.user.username);
        sessionStorage.setItem("username", res.data.user.username);
        const myToken = window.btoa(res.data.key);
        sessionStorage.setItem("token", myToken);
        toastSuccessNotify("User login successfully!");
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async (navigate) => {
    try {
      var config = {
        method: "post",
        url: `${url}users/auth/logout/`,
        headers: {
          Authorization: `Token ${myKey}`
        }
      };
      const res = await axios(config)
      if (res.status === 200) {
        setCurrentUser(false)
        setMyKey(false)
        sessionStorage.clear()
        toastSuccessNotify("User logged out successfully!");
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  let value = {
    currentUser,
    createUser,
    myKey,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
