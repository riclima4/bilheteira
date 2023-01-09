import React, { useEffect, useState } from "react";
import "./eventPageAdmin.css";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import festivalImg from "../../assets/festivalEx.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
  const [editEnable, setEditEnable] = useState(true);
  const [hideBtn, setHideBtn] = useState("none");

  const enableEdit = () => {
    setEditEnable(!editEnable);
    if (editEnable) {
      setHideBtn("");
    } else {
      setHideBtn("none");
    }
  };

  const handleOpenModalEdit = (ticket) => {
    setOpenModalEdit(true);
    setTicketItem(ticket);
  };
  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    setEditEnable(true);
    setHideBtn("none");
  };

  const deleteTicket = async (idTicket) => {
    const res = await axios.delete(
      "http://localhost:4242/api/deleteTickets/" + idTicket
    );

    if (res) {
      window.location.reload(false);
    }
    return "not done";
  };

  const handleOpenModalCreate = () => setCreateModal(true);
  const handleCloseModalCreate = () => {
    setCreateModal(false);
    setEditEnable(true);
    setHideBtn("none");
  };
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
          <div className="titleLineModal">
            <Typography variant="h6" component="h2">
              Titulo: {ticketItem.title}
            </Typography>
            <IconButton color="primary" onClick={() => enableEdit()}>
              <BorderColorIcon />
            </IconButton>
          </div>

          <form
            action={
              "http://localhost:4242/api/updateTicket/" + ticketItem.idTicket
            }
            method="post"
          >
            <TextField
              id="idEventID"
              value={ticketItem.idEvent}
              label={evento.title}
              name="idEvent"
              type="number"
              fullWidth
              readonly="true"
              disabled={editEnable}
            />
            <TextField
              id="titleID"
              name="title"
              // label="Nome do bilhete"
              variant="outlined"
              margin="dense"
              fullWidth
              disabled={editEnable}
              defaultValue={ticketItem.title}
            />
            <div className="flex inputEvent">
              <TextField
                id="priceID"
                name="price"
                // label="Preço"
                variant="outlined"
                margin="dense"
                fullWidth
                type="number"
                defaultValue={ticketItem.price}
                disabled={editEnable}
              />

              <TextField
                id="dispID"
                name="availability"
                label="Disponível"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                disabled={editEnable}
                defaultValue={ticketItem.availability}
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </TextField>
            </div>
            <div className="flex inputEvent">
              <TextField
                id="dateID"
                name="date"
                type="date"
                variant="outlined"
                margin="dense"
                fullWidth
                defaultValue={ticketItem.date}
                readonly="readonly"
                disabled={editEnable}
              />
              <TextField
                id="hourID"
                name="hour"
                type="time"
                variant="outlined"
                margin="dense"
                fullWidth
                defaultValue={ticketItem.hour}
                disabled={editEnable}
              />
            </div>
            <Typography align="right">
              <Button
                type="submit"
                color="success"
                variant="contained"
                size="medium"
                sx={{ mt: 2, display: hideBtn }}
              >
                Guardar
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>

      {/* Create Ticket MODAL */}
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
              <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{ mt: 2 }}
              >
                Criar
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
