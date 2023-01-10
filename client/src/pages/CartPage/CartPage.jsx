import React from "react";
import "./cartPage.css";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Divider } from "@mui/material";

export default function CartPage() {
  return (
    <div className="page-container">
      <div className="linhaTituloAndDelete">
        <h2>Carrinho</h2>
        <IconButton aria-label="delete" size="large">
          <CancelIcon color="error" />
        </IconButton>
      </div>
      <div className="cartContent">
        <div className="cart">
          <div className="linhas">
            <div className="linhaCart">
              <div className="linhaCartLeft">
                <Typography>Evento: RockInRio</Typography>
                <Typography>Bilhete: Bilhete VIP</Typography>
                <Typography>Data: 18/12/2024</Typography>
              </div>
              <div className="linhaCartRight">
                <Typography>50€</Typography>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </div>
            <Divider />
            <div className="linhaCart">
              <div className="linhaCartLeft">
                <Typography>Evento: RockInRio</Typography>
                <Typography>Bilhete: Bilhete VIP</Typography>
                <Typography>Data: 18/12/2024</Typography>
              </div>
              <div className="linhaCartRight">
                <Typography>50€</Typography>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </div>
            <Divider />
            <div className="linhaCart">
              <div className="linhaCartLeft">
                <Typography>Evento: RockInRio</Typography>
                <Typography>Bilhete: Bilhete VIP</Typography>
                <Typography>Data: 18/12/2024</Typography>
              </div>
              <div className="linhaCartRight">
                <Typography>50€</Typography>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </div>
            <Divider />
            <div className="linhaCart">
              <div className="linhaCartLeft">
                <Typography>Evento: RockInRio</Typography>
                <Typography>Bilhete: Bilhete VIP</Typography>
                <Typography>Data: 18/12/2024</Typography>
              </div>
              <div className="linhaCartRight">
                <Typography>50€</Typography>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="cartFull">
            <h4>Carrinho</h4>
            <p>Preço: 200€</p>
            <Button variant="contained" color="success">
              COMPRAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
