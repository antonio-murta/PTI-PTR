import React, { useState } from "react";
import "./../../categorias/main/ProdutoIndividual.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import axios from "axios";
import DeleteArmazemModal from "../../../DeleteArmazemModal";

// const client = axios.create({
//   baseURL: "http://localhost:3001/armazem/",
// });

const BoxArmazem = () => {
  let location = useLocation();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  console.log(location.state);

  // const deleteArmazem = async (id) => {
  //   try {
  //     await client.delete(`${id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
