import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="wrapper">
      <div className="flex menu">
        <div className="menuTitulo">
          <Link to="/">
            <i class="fa-solid fa-ticket"></i>
          </Link>
        </div>
        <div className="menuItems flex">
          <div className="notificationsItem">
            <Link to="/">
              <i class="fa-solid fa-bell"></i>
            </Link>
          </div>
          <div className="userIcon">
            <Link to="/account">
              <img
                className="userImg"
                src="https://www.w3schools.com/w3css/img_avatar3.png"
                alt="userImg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
