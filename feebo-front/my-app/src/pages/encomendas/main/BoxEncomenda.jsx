import React, { useState } from "react";
import "./../../categorias/main/ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import DeleteVeiculoModal from "../../../DeleteVeiculoModal";

const BoxEncomenda = () => {
  let location = useLocation();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <section className="shop background">
        <div className="cont">
          <div className="contentWidth">
            <div className="caixa">
              <Link to="/encomendas">
                <BsFillArrowLeftCircleFill className="arrow" size={25} />
              </Link>
              <div className="title">
                <h2>Encomenda {location.state.matricula}</h2>
              </div>
              <div className="informacao">
                <p>Estado: no armazém /em trânsito / entregue</p>
                <p>Poluição: {location.state.poluicao}x gCO2/km</p>
                <p>Armazém de origem: {location.state.modelo}</p>
                <p>Fornecedor: {location.state.modelo}</p>
                <DeleteVeiculoModal />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxEncomenda;
