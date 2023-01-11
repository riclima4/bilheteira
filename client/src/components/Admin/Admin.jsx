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
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import jwtDecode from "jwt-decode";

export default function Admin() {
  const [userID, setUserID] = useState();
  const navi = useNavigate();
  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserID(info.idUser);

      // console.log(info);
    } else {
      navi("/login");
    }
  }, [navi]);
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
  const [openEvent, setOpenEvent] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openModal, setOpenModalEvent] = useState(false);

  const [openModal2, setOpenModalUser] = useState(false);

  const [eventSelect, setEventSelect] = useState({});

  const [userSelect, setUserSelect] = useState({});

  const handleOpenCreateEvent = () => setOpenEvent(true);
  const handleCloseCreateEvent = () => setOpenEvent(false);

  const handleOpenCreateUser = () => setOpenUser(true);
  const handleCloseCreateUser = () => setOpenUser(false);

  const handleOpenModalEvent = (evento) => {
    setEventSelect(evento);
    setOpenModalEvent(true);
  };
  const handleCloseModalEvent = () => {
    setOpenModalEvent(false);
    setEditEnable(true);
    setHideBtn("none");
  };

  const handleOpenModalUser = (user) => {
    if (userID !== user.idUser) {
      setUserSelect(user);
      setOpenModalUser(true);
    } else {
      setOpenToast1(true);
    }
  };
  const handleCloseModalUser = () => {
    setOpenModalUser(false);
    setEditEnable(true);
    setHideBtn("none");
  };

  const urlEvents = "http://localhost:4242/api/events";
  const [eventos, setEventos] = useState([]);

  const urlUsers = "http://localhost:4242/api/users";
  const [users, setUsers] = useState([]);

  const urlDeleteUser = "http://localhost:4242/api/deleteUser/";
  const [openToast1, setOpenToast1] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast1(false);
  };

  const deleteUser = async (userId) => {
    if (userID !== userId) {
      setOpen(true);
      const res = await axios.delete(urlDeleteUser + userId);
      if (res) {
        window.location.reload(false);
      }
      return;
    } else {
      setOpenToast1(true);
    }
  };

  const getData = async () => {
    const res = await axios.get(urlEvents);
    const response = await axios.get(urlUsers);
    if (!res) return;
    // console.log(response.data);
    setEventos(res.data);
    setUsers(response.data);
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

      <div className="flex tituloSection tituloAndBtn">
        <h1>Users</h1>
        <button onClick={handleOpenCreateUser} className="addBilhetesBtn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="eventosBackground">
        <table>
          <thead>
            <tr>
              <th>Utilizador</th>
              <th>Email</th>
              <th>tipo</th>
              <th>Atualizar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.idUser}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.type === 100 ? "Admin" : "Cliente"}</td>
                  <td className="btnsEventRow">
                    <Button
                      fullWidth
                      component={Link}
                      onClick={() => deleteUser(user.idUser)}
                      variant="contained"
                      color="error"
                      className="btnLink"
                    >
                      Delete
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleOpenModalUser(user)}
                      color="primary"
                    >
                      Atualizar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Snackbar open={openToast1} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Não podes apagar ou editar este Utilizador!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Criar Evento MODAL */}
      <Modal
        open={openEvent}
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
      {/* Criar User MODAL */}
      <Modal
        open={openUser}
        onClose={handleCloseCreateUser}
        aria-labelledby="modal-modal-title"
      >
        <Box className="modalStyle">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex tituloInputEvent">
              <div>Criação de User</div>
              <IconButton onClick={handleCloseCreateUser} aria-label="delete">
                <CloseIcon />
              </IconButton>
            </div>
          </Typography>
          <form method="post" action="http://localhost:4242/api/newUserPage">
            <TextField
              id="outlined-basic"
              name="username"
              label="Nome de utilizador"
              variant="outlined"
              margin="dense"
              fullWidth
              required
            />
            <TextField
              id="outlined-basic"
              name="password"
              label="Password do utilizador"
              variant="outlined"
              margin="dense"
              fullWidth
              required
            />
            <div className="flex inputEvent">
              <TextField
                id="outlined-basic"
                name="email"
                label="Email do utilizador"
                variant="outlined"
                margin="dense"
                fullWidth
                required
              />

              <TextField
                id="outlined-basic-disp"
                name="type"
                label="Tipo de Utilizador"
                variant="outlined"
                margin="dense"
                fullWidth
                select
                defaultValue={1}
              >
                <MenuItem value={1}>Cliente</MenuItem>
                <MenuItem value={100}>Admin</MenuItem>
              </TextField>
            </div>
            <Typography align="right">
              <Button type="submit" variant="contained" size="medium">
                Criar
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>
      {/* Editar User */}
      <Modal open={openModal2} onClose={handleCloseModalUser}>
        <Box className="modalStyle">
          <div className="titleLineModal">
            <Typography variant="h6" component="h2">
              User: {userSelect.idUser}
            </Typography>
            <IconButton color="primary" onClick={() => enableEdit()}>
              <BorderColorIcon />
            </IconButton>
          </div>
          <form
            action={"http://localhost:4242/api/updateUser/" + userSelect.idUser}
            method="post"
          >
            <TextField
              value={userSelect.idUser}
              disabled={editEnable}
              label="ID do User"
              name="idUser"
              fullWidth
            />
            <TextField
              name="username"
              label="Nome do Utilisador"
              variant="outlined"
              margin="dense"
              defaultValue={userSelect.username}
              disabled={editEnable}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="Email do Utilisador"
              variant="outlined"
              margin="dense"
              disabled={editEnable}
              fullWidth
              defaultValue={userSelect.email}
              required
            />
            <div className="flex inputEvent">
              <TextField
                id="type"
                name="type"
                label="Tipo"
                variant="outlined"
                margin="dense"
                fullWidth
                disabled={editEnable}
                select
                defaultValue={userSelect.type}
                required
              >
                <MenuItem value={1}>Cliente</MenuItem>
                <MenuItem value={100}>Admin</MenuItem>
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
