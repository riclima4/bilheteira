import React, { useEffect, useState } from "react";
import "./cartPage.css";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Divider } from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default function CartPage() {
  const [userID, setUserID] = useState();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState();
  const cartUrl = "http://localhost:4242/api/userCart";
  const cartUrlDelete = "http://localhost:4242/api/userCart";
  const getCartByUser = async (idUser) => {
    const res = await axios.get(cartUrl + "/" + idUser);
    if (!res) return;
    setCart(res.data);
  };
  const getPrice = () => {
    const sum = cart.reduce((total, current) => total + current.ticketPrice, 0);
    console.log(sum);
    setPrice(sum);
  };
  const deleteCart = async (idCart) => {
    const res = await axios.delete(
      "http://localhost:4242/api/deleteCart/" + idCart
    );
    if (res) {
      window.location.reload(false);
    }
    return "not done";
  };
  const deleteAllCart = async (idUser) => {
    const res = await axios.delete(
      "http://localhost:4242/api/deleteAllCart/" + idUser
    );

    if (res) {
      window.location.replace("http://localhost:5500/");
    }
    return "not done";
  };

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserID(info.idUser);
      getCartByUser(info.idUser);
      //
    }

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getPrice();
  });
  return (
    <div className="page-container">
      <div className="linhaTituloAndDelete">
        <h2>Carrinho</h2>
        <IconButton
          onClick={() => deleteAllCart(userID)}
          aria-label="delete"
          size="large"
        >
          <CancelIcon color="error" />
        </IconButton>
      </div>
      <div className="cartContent">
        <div className="cart">
          <div className="linhas">
            {cart.map((item) => {
              return (
                <div key={item.idCart}>
                  <div className="linhaCart">
                    <div className="linhaCartLeft">
                      <Typography>Evento: {item.eventTitle}</Typography>
                      <Typography>Bilhete: {item.ticketTitle}</Typography>
                      <Typography>Data: {item.ticketDate}</Typography>
                    </div>
                    <div className="linhaCartRight">
                      <Typography>{item.ticketPrice}€</Typography>
                      <IconButton
                        onClick={() => deleteCart(item.idCart)}
                        aria-label="delete"
                        size="large"
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </div>
                  </div>
                  <Divider />
                </div>
              );
            })}
          </div>
          <div className="cartFull">
            <h4>Carrinho</h4>
            <p>Preço: {price ? price : 0}€</p>
            {price <= 0 ? (
              <Button disabled variant="contained" color="success">
                COMPRAR
              </Button>
            ) : (
              <Button variant="contained" color="success">
                COMPRAR
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
