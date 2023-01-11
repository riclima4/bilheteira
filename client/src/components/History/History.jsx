import React, { useEffect, useState } from "react";
import "./history.css";
import festivalImg from "../../assets/festivalEx.jpg";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {
  Alert,
  Backdrop,
  CircularProgress,
  Divider,
  Snackbar,
} from "@mui/material";

export default function History() {
  const [historico, setHistorico] = useState([]);
  const urlHistorico = "http://localhost:4242/api/history/";
  const [openToast1, setOpenToast1] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast1(false);
  };
  const getDataHistory = async (IDuser) => {
    const res = await axios.get(urlHistorico + IDuser);
    if (!res) return;
    setHistorico(res.data);
  };
  const deleteHistory = async (idHistory) => {
    const res = await axios.delete(
      "http://localhost:4242/api/deleteHistory/" + idHistory
    );

    if (res) {
      setOpen(true);
      setTimeout(() => {
        setOpenToast1(true);
      }, 1000);

      setTimeout(() => {
        window.location.reload(false);
      }, 1500);
    }
    return "not done";
  };
  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);

      getDataHistory(info.idUser);
    }
  }, []);

  return (
    <>
      <div className="flex tituloSection">
        <h1>Histórico de Compras</h1>
      </div>
      <div className="historico">
        {historico.map((item) => {
          return (
            <div key={item + item.idHistory}>
              <Divider />
              <div className="linha flex">
                <div className="leftSideLinha flex">
                  <img className="linhaImg" src={festivalImg} alt="userImg" />
                  <div className="linhaInfo">
                    <div className="firstCol">
                      <p>Evento: {item.eventTitle}</p>
                      <p>Bilhete: {item.ticketTitle}</p>
                      <p>Data do Bilhete: {item.ticketDate}</p>
                    </div>
                    <div className="secondCol">
                      <p>Data da compra: {item.date}</p>
                      <p>Hora da compra: {item.hour}</p>
                    </div>
                  </div>
                </div>
                <div className="rightSideLinha flex">
                  <button
                    onClick={() => deleteHistory(item.idHistory)}
                    className="trashBtn"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <Divider />
            </div>
          );
        })}
      </div>
      <Snackbar open={openToast1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Bilhete removido do historico com successo!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
