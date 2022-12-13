import React from "react";
import "./admin.css";
import { Button, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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

const rows = [
  { id: 1, evento: "Snow", sessoes: 2 },
  { id: 2, evento: "Lannister", sessoes: 3 },
  { id: 3, evento: "Lannistera", sessoes: 6 },
  { id: 4, evento: "Stark", sessoes: 1 },
  { id: 5, evento: "Targaryen", sessoes: 1 },
  { id: 6, evento: "Melisandre", sessoes: 1 },
  { id: 7, evento: "Clifford", sessoes: 2 },
  { id: 8, evento: "Frances", sessoes: 4 },
  { id: 9, evento: "Roxie", sessoes: 5 },
  { id: 10, evento: "asdasd", sessoes: 5 },
];
export default function Admin() {
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
