import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <div className="loginContent flex">
      <div className="loginLeft flex">
        <h1>Bem-vindo de volta!</h1>
        <img
          src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_login.png"
          alt=""
        />
      </div>
      <div className="loginRight">
        <h1>Login</h1>
        <form className="flex formLogin">
          <input type="text" placeholder="Email address" />
          <input type="password" placeholder="Password" />
          <button>Entrar</button>
        </form>
        <p className="formDesc">
          Se ainda não tem conta clica <Link to="/register">aqui</Link>
        </p>
      </div>
    </div>
  );
}
