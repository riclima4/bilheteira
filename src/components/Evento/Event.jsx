import React, { useEffect, useState } from "react";
import "./event.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import festivalImg from "../../assets/festivalEx.jpg";
import { Link } from "react-router-dom";

export default function Event(props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={props.evento.idEvent}>
      <Card>
        <Link className="linkCard" to={"/event/" + props.evento.idEvent}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="245"
              image={festivalImg}
              alt="eventoImg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.evento.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.evento.desc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
}
