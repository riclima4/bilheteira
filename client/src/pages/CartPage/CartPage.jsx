import React, { useEffect, useState } from "react";
import "./cartPage.css";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import CancelIcon from "@mui/icons-material/Cancel";
import {
  Button,
  Divider,
  Snackbar,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navi = useNavigate();
  const [userID, setUserID] = useState();
  const [cartID, setCartID] = useState();
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState();
  const cartUrl = "http://localhost:4242/api/userCart";
  const cartUrlOne = "http://localhost:4242/api/userCartOne";
  const cartUrlDelete = "http://localhost:4242/api/deleteCart/";
  const cartUrlDeleteAll = "http://localhost:4242/api/deleteAllCart/";
  const cartToHistory = "http://localhost:4242/api/createHistory/";

  const [openToast1, setOpenToast1] = useState(false);
  const [openToast2, setOpenToast2] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast1(false);
    setOpenToast2(false);
  };

  const getCartByUser = async (idUser) => {
    const res = await axios.get(cartUrl + "/" + idUser);
    if (!res) return;
    setCart(res.data);
  };
  const getPrice = () => {
    const sum = cart.reduce((total, current) => total + current.ticketPrice, 0);

    setPrice(sum);
  };
  const getCartID = async (idUser) => {
    const res = await axios.get(cartUrlOne + "/" + idUser);
    if (!res) return;
    // console.log(res.data.idCart);
    setCartID(res.data.idCart);
  };
  const handleBuy = () => {
    cart.forEach((item) => {
      axios.post(cartToHistory, item);
    });
    setOpenToast1(true);
    setTimeout(() => {
      console.log(userID);
      deleteAllCart(userID);
    }, 2000);
    setOpen(true);
  };
  const deleteCart = async (idCart) => {
    const res = await axios.delete(cartUrlDelete + idCart);
    if (res) {
      window.location.reload(false);
      setOpenToast1(true);
      setTimeout(() => {}, 2000);
      setOpen(true);
    }
    return "not done";
  };
  const deleteAllCart = async (idUser) => {
    const res = await axios.delete(cartUrlDeleteAll + idUser);

    if (res) {
      window.location.replace("http://localhost:5500/");
      setOpenToast1(true);
    }
    return "not done";
  };

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserID(info.idUser);
      getCartByUser(info.idUser);
      getCartID(info.idUser);
      //
    } else {
      navi("/login");
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
          onClick={() => {
            deleteAllCart(userID);
          }}
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
                        onClick={() => {
                          deleteCart(item.idCart);
                        }}
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
              <Button
                onClick={() => {
                  handleBuy();
                }}
                variant="contained"
                color="success"
              >
                COMPRAR
              </Button>
            )}
          </div>
        </div>
      </div>
      <Snackbar open={openToast1} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Bilhete Removido com Sucesso!
        </Alert>
      </Snackbar>

      <Snackbar open={openToast2} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Compra efetuada com Sucesso!
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
