import React from "react";
import "./admin.css";

export default function Admin() {
  return (
    <>
      <div className="flex tituloSection tituloAndBtn">
        <h1>Bilhetes</h1>
        <button className="addBilhetesBtn">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="flex flex-addBilhetesBtn"></div>
      <div className="bilhetes">
        <table className="tabelaBilhetes">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Localização</th>
              <th>Disponibilidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>nometeste</td>
              <td>
                descTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTestedescTeste
              </td>
              <td>LocTeste</td>
              <td>
                <div className="disponibilidadeAtiva">Ativo</div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>nometeste</td>
              <td>descTeste</td>
              <td>LocTeste</td>
              <td>
                <div className="disponibilidadeDesativa">Desativo</div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>nometeste</td>
              <td>descTeste</td>
              <td>LocTeste</td>
              <td>
                <div className="disponibilidadeAtiva">Ativo</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
