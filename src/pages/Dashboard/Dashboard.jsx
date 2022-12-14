import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Event from "../../components/Evento/Event";
import { Grid } from "@mui/material";
import axios from "axios";

export default function Dashboard() {
  return (
    <div className="DashboardContent">
      <div className="banner">
        <h1 className="tituloText">Bem-vindos à PurpleTicket</h1>
        <h3 className="descText">
          Comprem bilhetes para os eventos disponíveis
        </h3>
      </div>

      <div className="eventos">
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{
            justifyContent: "center",
          }}
        >
          <Event />
        </Grid>
      </div>
    </div>
  );
}
