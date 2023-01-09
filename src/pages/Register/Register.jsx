import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import SignupImg from "../../assets/SignupImg.png";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
      setOpen(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4242/api/newUser", user);
      setOpen(true);
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
          <img src={SignupImg} />
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
              type="text"
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: "100%" }}
              >
                Passwords nao coincidem!
              </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
      <Footer />
    </>
  );
}
