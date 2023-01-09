import { Link, useNavigate } from "react-router-dom";

import "./login.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import LogInImg from "../../assets/LoginImg.png";

export default function Login() {
  const navi = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      navi("/");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.password !== ""
      // &&
      // formData.email === apiItem.email
    ) {
      const { data } = await axios.post(
        `http://localhost:4242/api/auth`,
        formData
      );
      localStorage.setItem("token", data.token);
      navi("/");
      window.location.reload(false);
    } else {
      console.log("Form data does not match API item");
    }
  };

  return (
    <>
      <div className="loginContent flex">
        <div className="loginLeft flex">
          <h1>Bem-vindo de volta!</h1>
          <img src={LogInImg} alt="LogginImg" />
        </div>
        <div className="loginRight">
          <h1>Login</h1>
          <form className="flex formLogin" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              variant="filled"
              type="text"
              label="Email address"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              variant="filled"
              type="password"
              label="Password"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
            />
            <Button variant="contained" type="submit">
              Entrar
            </Button>
          </form>
          <p className="formDesc">
            Se ainda não tem conta clica <Link to="/register">aqui</Link>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
