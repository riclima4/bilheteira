import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="wrapper">
      <div className="flex menu">
        <div className="menuTitulo">
          <a href="#">
            <i class="fa-solid fa-ticket"></i>
          </a>
        </div>
        <div className="menuItems flex">
          <div className="notificationsItem">
            <a href="#">
              <i class="fa-solid fa-bell"></i>
            </a>
          </div>
          <div className="userIcon">
            <a href="#">
              <img
                className="userImg"
                src="https://www.w3schools.com/w3css/img_avatar3.png"
                alt="userImg"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
