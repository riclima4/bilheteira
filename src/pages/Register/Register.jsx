import React from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
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
        <form className="flex formRegister">
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirma Password" />
          <button>Registar</button>
        </form>
        <p className="formDesc">
          Se já tem conta entre <Link to="/login">aqui</Link>
        </p>
      </div>
    </div>
  );
}
