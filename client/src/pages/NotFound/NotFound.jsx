import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./notFound.css";
import NotFoundImg from "../../assets/404.png";
import Footer from "../../components/Footer/Footer";

export default function NotFound() {
  return (
    <>
      <div className="notFoundBackground">
        <div className="NotFoundContent">
          <h1>Oops! Pareces estar perdido</h1>
          <h3>Esta pagina não existe</h3>
          <img src={NotFoundImg}></img>
          <Button to="/" variant="contained" component={Link} color="secondary">
            Ir para página inicial
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
