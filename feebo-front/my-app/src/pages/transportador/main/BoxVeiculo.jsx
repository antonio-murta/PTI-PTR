import React, { useState } from "react";
import "./../../categorias/main/ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const BoxVeiculo = () => {
  let location = useLocation();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  console.log(location.state);
  return (
    <>
      <section className="shop background">
        <div className="cont">
          <div className="contentWidth">
            <div className="caixa">
              <Link to="/transportador">
                <BsFillArrowLeftCircleFill className="arrow" size={25} />
              </Link>
              <div className="title">
                <h2>Veículo {location.state.id}</h2>
              </div>
              <p>Marca: {location.state.marca}</p>
              <p>Modelo: {location.state.modelo}</p>
              <p>Poluição: {location.state.poluicao}gCO2/km</p>
              <p>Estado: livre/ocupado</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxVeiculo;
