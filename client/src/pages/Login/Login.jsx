import { Link, useNavigate } from "react-router-dom";

import "./login.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import LogInImg from "../../assets/LoginImg.png";

export default function Login() {
  const [openToast1, setOpenToast1] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast1(false);
  };

  const navi = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      navi("/");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== "") {
      const { data } = await axios.post(
        `http://localhost:4242/api/auth`,
        formData
      );
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navi("/");
      }, "2000");
      setOpen(true);

    } else {
      console.log("Dados Incorretos");
      setOpenToast1(true);
    }
  };

  const [open, setOpen] = useState(false);

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
              variant="filled"
              type="text"
              label="Email address"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />

            <TextField
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={openToast1} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Credenciais Erradas!
        </Alert>
      </Snackbar>
    </>
  );
}
