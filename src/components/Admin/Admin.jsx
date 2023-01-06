import React, { useEffect, useState } from "react";
import "./admin.css";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const handleBilhetes = (event, cellValues) => {
  //buscar o id do evento
  console.log(cellValues.row.id);
};

const handleToggle = (event, cellValues) => {
  //buscar a disponibilidade
  console.log(cellValues.row.availability);
};

const handleRowClick = (param, event) => {
  alert("Hello! I am an alert box!!");
};

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModalEvent] = useState(false);
  const handleOpenCreateEvent = () => setOpen(true);
  const handleCloseCreateEvent = () => setOpen(false);
  const handleOpenModalEvent = () => setOpenModalEvent(true);
  const handleCloseModalEvent = () => setOpenModalEvent(false);
  const urlEvents = "http://localhost:4242/api/events";
  const [eventos, setEventos] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      minWidth: 70,
      headerClassName: "super-app-theme--header",
    },
    { field: "evento", headerName: "Evento", flex: 1, minWidth: 90 },
    {
      field: "sessoes",
      headerName: "Sessões",
      flex: 1,
      minWidth: 100,
      align: "left",
    },
    {
      field: "bilhetes",
      headerName: "Bilhetes",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Link to={"/ticketsByEventAdmin/" + cellValues.row.id}>
            <Button variant="contained" color="success">
              Ver
            </Button>
          </Link>
        );
      },
    },
    {
      field: "verBilhete",
      headerName: "Ver Mais",
      flex: 1,
      minWidth: 50,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            onClick={handleOpenModalEvent}
            color="primary"
          >
            Ver Evento
          </Button>
        );
      },
    },
  ];
  const rows = [];
  const getData = async () => {
    const res = await axios.get(urlEvents);
    if (!res) return;
    console.log(res.data);
    setEventos(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  eventos.map((e) => {
    const obj = {
      id: e.idEvent,
      evento: e.title,
      sessoes: e.sessoes,
    };
    rows.push(obj);
    // console.log(rows);
  });

  return (
    <>
      <div className="flex tituloSection tituloAndBtn">
        <h1>Eventos</h1>
        <button onClick={handleOpenCreateEvent} className="addBilhetesBtn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="tabela">
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10]}
          disableColumnFilter
          disableColumnMenu
        />
      </div>
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
          <form>
            <TextField
              id="outlined-basic"
              name="titulo"
              label="Titulo do Evento"
              variant="outlined"
              margin="dense"
              fullWidth
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
              />

              <TextField
                id="outlined-basic-disp"
                name="disp"
                label="Disponibilidade"
                variant="outlined"
                margin="dense"
                fullWidth
                select
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
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
              />
              <TextField
                id="outlined-basic"
                name="tipo"
                label="Tipo"
                variant="outlined"
                margin="dense"
                fullWidth
                select
              >
                <option value="concerto">Concerto</option>
                <option value="teatro">Teatro</option>
                <option value="festival">Festival</option>
                <option value="standup">Stand Up Comedy</option>
              </TextField>
            </div>

            <TextField
              id="outlined-basic"
              name="data"
              type="date"
              variant="outlined"
              margin="dense"
              fullWidth
            />

            <TextField
              id="outlined-basic"
              name="desc"
              label="Descrição"
              variant="outlined"
              margin="dense"
              fullWidth
              minRows="3"
              multiline="true"
            />
            <Typography align="right">
              <Button type="submit" variant="contained" size="medium">
                Criar
              </Button>
            </Typography>
          </form>
        </Box>
      </Modal>
    </>
  );
}
