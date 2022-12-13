import React from "react";
import "./event.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import festivalImg from "../../assets/festivalEx.jpg";

export default function Event() {
  return (
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
            Evento Nome
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Descrição sobre o evento a acontecer
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
