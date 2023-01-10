import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./notFound.css";
import NotFoundImg from "../../assets/404.png";

export default function NotFound() {
  return (
    <>
      <div className="notFoundBackground">
        <div className="NotFoundContent">
          <h1>Oops! Pareces estar perdido</h1>
          <h3>Esta pagina não encontrada</h3>

          <img src={NotFoundImg} alt="404 NotFound Image "></img>


          <Button
            to="/"
            variant="contained"
            component={Link}
            color="secondary"
            className="btnLink"
          >
            Ir para página inicial
          </Button>
        </div>
      </div>
    </>
  );
}
