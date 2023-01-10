import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Event from "../../components/Evento/Event";
import { Grid } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

export default function Dashboard() {
  const urlEvents = "http://localhost:4242/api/eventsAvailable";
  const navi = useNavigate();

  const [eventos, setEventos] = useState([]);

  const getData = async () => {
    const res = await axios.get(urlEvents);
    if (!res) return;
    setEventos(res.data);
  };

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (!hasToken) {
      navi("/login");
    }
  });

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="page-container">
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
            {eventos.map((evento) => {
              if (evento.sessoes > 0) {
                return <Event key={evento.idEvent} evento={evento} />;
              }
              return "";
            })}
          </Grid>
        </div>
        <Footer />
      </div>
    </div>
  );
}
