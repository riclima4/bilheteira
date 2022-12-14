import React, { useEffect, useState } from "react";
import "./event.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import festivalImg from "../../assets/festivalEx.jpg";
import axios from "axios";

export default function Event() {
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
  return eventos.map((evento) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={evento.idEvent}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="245"
              image={festivalImg}
              alt="evento"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {evento.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {evento.desc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });
}
