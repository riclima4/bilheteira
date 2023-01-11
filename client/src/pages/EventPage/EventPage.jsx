import React, { useEffect, useState } from "react";
import "./eventPage.css";
import { Alert, Button, IconButton, Snackbar, Typography } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import festivalImg from "../../assets/festivalEx.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function EventPage() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userID, setUserID] = useState();
  const [ticketCard, setTicketCard] = useState();
  const urlEvents = "http://localhost:4242/api/event/" + id;
  const urlTickets = "http://localhost:4242/api/ticket/event/" + id;
  const urlAddToCart = "http://localhost:4242/api/newCart/" + id;
  // const urlTicketByID = "http://localhost:4242/api/tickets/" + ticketCard;
  const [evento, setEvento] = useState({});
  const [ticketByEvent, setTicketByEvent] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleCloseSnackBar = () => {
    setSnackbarOpen(false);
  };
  const handleOpenSnackBar = () => {
    setSnackbarOpen(true);
  };
  const addToCart = async (ticket) => {
    const newItem = {
      idTicket: ticket.idTicket,
      idUser: userID,
      eventTitle: evento.title,
      ticketTitle: ticket.title,
      ticketDate: ticket.date,
      ticketPrice: ticket.price,
    };
    const res = await axios.post(urlAddToCart, newItem).then(
      handleOpenSnackBar(),
      setTimeout(() => {
        window.location.reload(false);
      }, "1000")
    );
    if (!res) return;
  };

  const getDataEvent = async () => {
    // console.log(urlEvents);
    const res = await axios.get(urlEvents);
    if (!res) return;
    setEvento(res.data);
  };
  const getDataTicketByEvent = async () => {
    // console.log(urlTickets);
    const res = await axios.get(urlTickets);
    if (!res) return;
    setTicketByEvent(res.data);
    // console.log(res.data);
  };
  // const getDataTicketByID = async () => {
  //   console.log(urlTicketByID);
  //   const res = await axios.get(urlTicketByID);
  //   if (!res) return;
  //   setTicketByID(res.data);
  //   console.log(res.data);
  // };

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserInfo(info);
      setUserID(info.idUser);
      // console.log(info.idUser);
    }
    getDataEvent();
    getDataTicketByEvent();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="page-container">
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={1000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Bilhete adicionado ao carrinho!
        </Alert>
      </Snackbar>

      <div className="EventPageContent">
        <div className="EventoContent">
          <img src={festivalImg} alt="imagemEvento" />
          <div className="infoEvento">
            <h1>{evento.title}</h1>
            <p>{evento.desc}</p>
            <h3>Local: {evento.local}</h3>
            <h3>Data: {evento.date}</h3>
            <h2>Vê a baixo os Bilhetes disponivéis</h2>
          </div>
        </div>
        <div className="backgroundCard">
          <div className="linhasTicket">
            {ticketByEvent.map((ticket) => {
              return (
                <div className="line" key={ticket.idTicket}>
                  <div className="ticketName">{ticket.title}</div>
                  <div className="ticketShow">
                    <IconButton
                      color="primary"
                      onClick={() => setTicketCard(ticket)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
          {ticketCard ? (
            <div className="ticketInfo">
              <Typography align="right">
                <IconButton color="primary" onClick={() => setTicketCard()}>
                  <CloseIcon />
                </IconButton>
              </Typography>

              <h3>{ticketCard.title}</h3>
              <p>{ticketCard.hour}h</p>
              <p>{ticketCard.price}€</p>
              <Button
                variant="contained"
                onClick={() => addToCart(ticketCard)}
                endIcon={<ShoppingCartIcon />}
              >
                Comprar
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
