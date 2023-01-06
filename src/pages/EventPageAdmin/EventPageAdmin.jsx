import React, { useEffect, useState } from "react";
import "./eventPageAdmin.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import festivalImg from "../../assets/festivalEx.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
export default function EventPageAdmin() {
  const { id } = useParams();
  const urlEvents = "http://localhost:4242/api/event/" + id;
  const urlTickets = "http://localhost:4242/api/ticket/event/" + id;

  const [evento, setEvento] = useState({});
  const [ticketByEvent, setTicketByEvent] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [ticketItem, setTicketItem] = useState({});

  const handleOpenModalEdit = (ticket) => {
    setOpenModalEdit(true);
    setTicketItem(ticket);
  };
  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const deleteTicket = (idTicket) => {
    window.location.replace(
      "http://localhost:4242/api/deleteTickets/" + idTicket
    );
  };

  const handleOpenModalCreate = () => setCreateModal(true);
  const handleCloseModalCreate = () => setCreateModal(false);
  const getDataEvent = async () => {
    console.log(urlEvents);
    const res = await axios.get(urlEvents);
    if (!res) return;
    setEvento(res.data);
  };
  const getDataTicketByEvent = async () => {
    console.log(urlTickets);
    const res = await axios.get(urlTickets);
    if (!res) return;
    setTicketByEvent(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getDataEvent();
    getDataTicketByEvent();
  }, []);

  return (
    <div className="page-container">
      <div className="EventPageContent">
        <div className="EventoContent">
          <img src={festivalImg} alt="imagemEvento" />
          <div className="infoEvento">
            <h1>{evento.title}</h1>
            <p>{evento.desc}</p>
            <h3>Local: {evento.local}</h3>
            <h3>Data: {evento.date}</h3>
          </div>
        </div>
        <div className="addTicketLine">
          <Button
            onClick={() => handleOpenModalCreate()}
            variant="contained"
            color="secondary"
            endIcon={<AddIcon />}
          >
            Bilhete
          </Button>
        </div>
        <div className="backgroundCard">
          <div className="linhasTicket">
            {ticketByEvent.map((ticket) => {
              return (
                <div className="line" key={ticket.idTicket}>
                  <div className="ticketName">{ticket.title}</div>
                  <div className="ticketShow">
                    <Button
                      onClick={() => handleOpenModalEdit(ticket)}
                      variant="contained"
                      endIcon={<VisibilityIcon />}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => deleteTicket(ticket.idTicket)}
                      color="error"
                      variant="contained"
                      endIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
      <Modal open={openModalEdit} onClose={handleCloseModalEdit}>
        <Box className="modalStyle">
          <Typography variant="h6" component="h2">
            Titulo: {ticketItem.title}
          </Typography>
          <Typography sx={{ mt: 2 }}>Data: {ticketItem.date} </Typography>
        </Box>
      </Modal>
      <Modal open={createModal} onClose={handleCloseModalCreate}>
        <Box className="modalStyle">
          <Typography variant="h6" component="h2">
            Criar Bilhete
          </Typography>
          <form action="http://localhost:4242/api/createTicket" method="post">
            <TextField
              value={evento.idEvent}
              label={evento.title}
              name="idEvent"
              fullWidth
            />
            <TextField
              name="title"
              label="Nome do bilhete"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <div className="flex inputEvent">
              <TextField
                name="price"
                label="Preço"
                variant="outlined"
                margin="dense"
                fullWidth
                type="number"
              />

              <TextField
                id="outlined-basic-disp"
                name="availability"
                label="Disponibilidade"
                variant="outlined"
                margin="dense"
                fullWidth
                select
              >
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </TextField>
            </div>
            <div className="flex inputEvent">
              <TextField
                id="outlined-basic"
                name="date"
                type="date"
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                name="hour"
                type="time"
                variant="outlined"
                margin="dense"
                fullWidth
              />
            </div>

            <Typography align="right">
              <Button type="submit" variant="contained" size="medium">
                Criar
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
