import React, { useEffect, useState } from "react";
import "./admin.css";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function Admin() {
  const enableEdit = () => {
    setEditEnable(!editEnable);
    if (editEnable) {
      setHideBtn("");
    } else {
      setHideBtn("none");
    }
  };
  const [editEnable, setEditEnable] = useState(true);
  const [hideBtn, setHideBtn] = useState("none");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModalEvent] = useState(false);
  const [eventSelect, setEventSelect] = useState({});
  const handleOpenCreateEvent = () => setOpen(true);
  const handleCloseCreateEvent = () => setOpen(false);
  const handleOpenModalEvent = (evento) => {
    setEventSelect(evento);
    setOpenModalEvent(true);
  };
  const handleCloseModalEvent = () => {
    setOpenModalEvent(false);
    setEditEnable(true);
    setHideBtn("none");
  };
  const urlEvents = "http://localhost:4242/api/events";
  const [eventos, setEventos] = useState([]);

  const getData = async () => {
    const res = await axios.get(urlEvents);
    if (!res) return;
    console.log(res.data);
    setEventos(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex tituloSection tituloAndBtn">
        <h1>Eventos</h1>
        <button onClick={handleOpenCreateEvent} className="addBilhetesBtn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="eventosBackground">
        <table>
          <thead>
            <tr>
              <th>Nome do Evento</th>
              <th>Sessões</th>
              <th>data</th>
              <th>tipo</th>
              <th>Ver/Bilhetes</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => {
              return (
                <tr key={evento.idEvent}>
                  <td>{evento.title}</td>
                  <td>{evento.sessoes}</td>
                  <td>{evento.date}</td>
                  <td>{evento.type}</td>
                  <td className="btnsEventRow">
                    <Button
                      fullWidth
                      component={Link}
                      to={"/ticketsByEventAdmin/" + evento.idEvent}
                      variant="contained"
                      color="success"
                      className="btnLink"
                    >
                      Bilhetes
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleOpenModalEvent(evento)}
                      color="primary"
                    >
                      Evento
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Criar Evento MODAL */}
      <Modal
        open={open}
        onClose={handleCloseCreateEvent}
        aria-labelledby="modal-modal-title"
      >
        <Box className="modalStyle">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex tituloInputEvent">
              <div>Criação do Evento</div>
              <IconButton onClick={handleCloseCreateEvent} aria-label="delete">
                <CloseIcon />
              </IconButton>
            </div>
          </Typography>
          <form method="post" action="http://localhost:4242/api/createEvent">
            <TextField
              id="outlined-basic"
              name="title"
              label="Titulo do Evento"
              variant="outlined"
              margin="dense"
              fullWidth
              required
            />
            <div className="flex inputEvent">
              <TextField
                id="outlined-basic-title"
                name="sessoes"
                label="Nº Sessões"
                variant="outlined"
                margin="dense"
                fullWidth
                type="number"
                required
              />

              <TextField
                id="outlined-basic-disp"
                name="availability"
                label="Disponibilidade"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                value="1"
              >
                <MenuItem value="1">Sim</MenuItem>
                <MenuItem value="0">Não</MenuItem>
              </TextField>
            </div>
            <div className="flex inputEvent">
              <TextField
                id="outlined-basic"
                name="local"
                label="Local"
                variant="outlined"
                margin="dense"
                fullWidth
                required
              />
              <TextField
                id="outlined-basic"
                name="type"
                label="Tipo"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                required
                defaultValue=""
              >
                <MenuItem value="concerto">Concerto</MenuItem>
                <MenuItem value="teatro">Teatro</MenuItem>
                <MenuItem value="festival">Festival</MenuItem>
                <MenuItem value="standup">Stand Up Comedy</MenuItem>
              </TextField>
            </div>

            <TextField
              id="outlined-basic"
              name="date"
              type="date"
              variant="outlined"
              margin="dense"
              fullWidth
              required
            />

            <TextField
              id="outlined-basic"
              name="desc"
              label="Descrição"
              variant="outlined"
              margin="dense"
              fullWidth
              minRows="3"
              multiline
              required
            />
            <Typography align="right">
              <Button type="submit" variant="contained" size="medium">
                Criar
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>
      {/* Ver Evento MODAL */}
      <Modal open={openModal} onClose={handleCloseModalEvent}>
        <Box className="modalStyle">
          <div className="titleLineModal">
            <Typography variant="h6" component="h2">
              Titulo: {eventSelect.title}
            </Typography>
            <IconButton color="primary" onClick={() => enableEdit()}>
              <BorderColorIcon />
            </IconButton>
          </div>
          <form
            action={
              "http://localhost:4242/api/updateEvents/" + eventSelect.idEvent
            }
            method="post"
          >
            <TextField
              value={eventSelect.idEvent}
              disabled={editEnable}
              label="ID do Evento"
              name="idEvent"
              fullWidth
            />
            <TextField
              name="title"
              label="Nome do Evento"
              variant="outlined"
              margin="dense"
              defaultValue={eventSelect.title}
              disabled={editEnable}
              fullWidth
              required
            />
            <TextField
              name="local"
              label="Local do Evento"
              variant="outlined"
              margin="dense"
              disabled={editEnable}
              fullWidth
              defaultValue={eventSelect.local}
              required
            />
            <TextField
              id="desc"
              name="desc"
              label="Descrição"
              variant="outlined"
              margin="dense"
              disabled={editEnable}
              fullWidth
              defaultValue={eventSelect.desc}
              minRows="3"
              multiline
              required
            />
            <div className="flex inputEvent">
              <TextField
                name="sessoes"
                label="Sessões"
                variant="outlined"
                defaultValue={eventSelect.sessoes}
                disabled={editEnable}
                margin="dense"
                fullWidth
                type="number"
                required
              />

              <TextField
                id="disp"
                name="availability"
                label="Disponibilidade"
                variant="outlined"
                margin="dense"
                fullWidth
                disabled={editEnable}
                select
                defaultValue={eventSelect.availability}
                required
              >
                <MenuItem value={true}>Sim</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </TextField>
            </div>
            <div className="flex inputEvent">
              <TextField
                id="outlined-basic"
                name="date"
                type="date"
                variant="outlined"
                margin="dense"
                defaultValue={eventSelect.date}
                disabled={editEnable}
                fullWidth
                required
              />
              <TextField
                id="outlined-basic"
                name="type"
                label="Tipo"
                variant="outlined"
                margin="dense"
                defaultValue={eventSelect.type}
                fullWidth
                disabled={editEnable}
                select
                required
              >
                <MenuItem value="concerto">Concerto</MenuItem>
                <MenuItem value="teatro">Teatro</MenuItem>
                <MenuItem value="festival">Festival</MenuItem>
                <MenuItem value="standup">Stand Up Comedy</MenuItem>
              </TextField>
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
    </>
  );
}
