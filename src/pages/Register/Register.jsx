import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    try {
      const res = await axios.post("/auth/register", user);
      
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="registerContent flex">
      <div className="registerLeft flex">
        <h1>Bem-vindo de volta!</h1>
        <img
          src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_login.png"
          alt=""
        />
      </div>
      <div className="registerRight">
        <h1>Registar</h1>
        <form className="flex formRegister" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" onChange={(e) => setUsername(e.target.value)}/>
          <input type="text" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirma Password" />
          <button type="submit" >Registar</button>
        </form>
        <p className="formDesc">
          Se já tem conta entre <Link to="/login">aqui</Link>
        </p>
      </div>
    </div>
  );
}
