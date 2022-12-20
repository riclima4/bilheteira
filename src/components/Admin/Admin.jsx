import React, { useEffect, useState } from "react";
import "./admin.css";
import { Button, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const handleBilhetes = (event, cellValues) => {
  //buscar o id do evento
  console.log(cellValues.row.id);
};

const putToggle = (event, cellValues) => {
  if (cellValues.row.availability == true) {
  }
  //buscar a disponibilidade
  console.log();
};

const handleCellClick = (param, event) => {
  event.stopPropagation();
};

const handleRowClick = (param, event) => {
  event.stopPropagation();
};

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
        <Button
          variant="contained"
          color="success"
          onClick={(event) => {
            handleBilhetes(event, cellValues);
          }}
        >
          ver Bilhetes
        </Button>
      );
    },
  },
  {
    field: "disponiblidade",
    headerName: "Disponiblidade",
    flex: 1,
    minWidth: 70,
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <Switch
          defaultChecked
          variant="contained"
          color="primary"
          value="active"
          onClick={(event) => {
            handleToggle(event, cellValues);
          }}
        >
          ver Bilhetes
        </Switch>
      );
    },
  },
];

export default function Admin() {
  const urlEvents = "http://localhost:4242/api/events";
  const [eventos, setEventos] = useState([]);
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
      availability: e.availability,
    };
    rows.push(obj);
    console.log(rows);
  });

  return (
    <>
      <div className="flex tituloSection tituloAndBtn">
        <h1>Eventos</h1>
        <button className="addBilhetesBtn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="tabela">
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableColumnFilter
          disableColumnMenu
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
