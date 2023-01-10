import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { Alert, Button, Snackbar, TextField } from "@mui/material";

import SignupImg from "../../assets/SignupImg.png";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [openToast1, setOpenToast1] = useState(false);
  const [openToast2, setOpenToast2] = useState(false);

  const navi = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast2(false);
    setOpenToast1(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    if (password !== repeatPassword) {
      console.log("Passwords dont match");
      setOpenToast1(true);
      return;
    }

    try {
      await axios.post("http://localhost:4242/api/newUser", user);
      setOpenToast2(true);
      setTimeout(() => {
        navi("/login");
      }, "2000");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="registerContent flex">
        <div className="registerLeft flex">
          <h1>Bem-vindo</h1>
          <h3>Cria já a tua conta na Purple Ticket</h3>

          <img src={SignupImg} alt="SignUpImg" />

        </div>
        <div className="registerRight">
          <h1>Registar</h1>
          <form className="flex formRegister" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              variant="filled"
              type="text"
              label="Nome"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              variant="filled"
              type="email"
              label="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              variant="filled"
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              variant="filled"
              type="password"
              label="Confirma Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Registar
            </Button>

            <Snackbar
              open={openToast1}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: "100%" }}
              >
                Passwords nao coincidem!
              </Alert>
            </Snackbar>

            <Snackbar
              open={openToast2}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Conta Criada Com sucesso!
              </Alert>
            </Snackbar>
          </form>
          <p className="formDesc">
            Se já tem conta entre <Link to="/login">aqui</Link>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
