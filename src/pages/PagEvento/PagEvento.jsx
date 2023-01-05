import React from "react";
import Footer from "../../components/Footer/Footer";
import festivalImg from "../../assets/festivalEx.jpg";
import "./pagEvento.css";
export default function PagEvento() {
  return (
    <div className="page-container">
      <div className="DashboardContent">
        <div className="tituloSection">Titulo Evento</div>
        <div className="flex eventInfo">
          <div className="eventText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, ea
            fugit labore itaque id, neque voluptate omnis sequi optio incidunt
            voluptas odio doloremque dolore dignissimos repudiandae, quam
            repellat aliquam! Suscipit. Expedita officia eligendi labore aliquid
            adipisci a soluta enim rem, sint et quaerat numquam ea, quasi dicta,
            ut ratione cupiditate tempore repellendus qui necessitatibus!
          </div>
          <img src={festivalImg} className="eventImg" />
        </div>
        <Footer />
      </div>
    </div>
  );
}
