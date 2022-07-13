import React, { useState } from "react";
import "./../../categorias/main/ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import DeleteArmazemModal from "../../../DeleteArmazemModal";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BoxArmazem = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <section className="shop background">
        <div className="cont">
          <div className="contentWidth">
            <div className="caixa">
              <Link to="/fornecedor">
                <BsFillArrowLeftCircleFill className="arrow" size={25} />
              </Link>
              <div className="title">
                <h2>Armazém {location.state.name}</h2>
              </div>
              <div className="informacao">
                <p>Tipo: {location.state.tipo}</p>
                <p>Produtos: {location.state.produtos}</p>
                <p>Localização: {location.state.local}</p>
                <p>Poluição: {location.state.poluicao}gCO2/km</p>
                <p>Contacto: {location.state.telemovel}</p>
                <p>Produtos: </p>

                <div className="new-product">
                  <button onClick={() => navigate("/addProduto")}>
                    <div className="plus-icon">
                      <AiOutlinePlus />
                    </div>
                    Novo Produto
                  </button>
                </div>
                <DeleteArmazemModal />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxArmazem;
