import React, { useState } from "react";
import "./../../categorias/main/ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001",
});

const BoxVeiculo = () => {
  let location = useLocation();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  console.log(location.state);

  const deleteVeiculo = async (id) => {
    try {
      await client.delete(`${id}`);
    } catch (error) {
      console.log(error);
    }
  };

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

              <button onClick={() => deleteVeiculo(location.state.id)}>
                <div className="plus-icon">
                  <BiTrash />
                </div>
                Apagar Veículo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxVeiculo;
