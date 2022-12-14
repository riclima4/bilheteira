import React, { useEffect, useState } from "react";
import "./admin.css";
import { Button, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const handleBilhetes = (event, cellValues) => {
  //buscar o id do evento
  console.log(cellValues.row.id);
};
const handleToggle = (event, cellValues) => {
  //buscar o id do evento
  console.log(cellValues.row.disponibilidade);
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
    const obj = { id: e.idEvent, evento: e.title, sessoes: e.sessoes };
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
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableColumnFilter
          disableColumnMenu
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
        />
      </div>

      {/* <div className="flex tituloSection tituloAndBtn">
        <h1>Bilhetes</h1>
        <button className="addBilhetesBtn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="bilhetes">
        <table className="tabelaBilhetes">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Evento</th>
              <th>Sessão</th>
              <th>Descrição</th>
              <th>Hora</th>
              <th>Disponibilidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>EventoNome</td>
              <td>Sessao</td>
              <td>
                descTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTeste
              </td>
              <td>Hora</td>
              <td>
                <div className="disponibilidadeAtiva">Ativo</div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>EventoNome</td>
              <td>Sessao</td>
              <td>descTeste</td>
              <td>Hora</td>
              <td>
                <div className="disponibilidadeDesativa">Desativo</div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>EventoNome</td>
              <td>Sessao</td>
              <td>descTeste</td>
              <td>Hora</td>
              <td>
                <div className="disponibilidadeAtiva">Ativo</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>
  );
}
