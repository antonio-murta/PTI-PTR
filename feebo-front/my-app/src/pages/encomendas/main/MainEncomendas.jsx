import Notifications from "./Notifications";
import Encomendas from "./Encomendas";
import "./style-encomendas.css";
import { TiPlus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const MainEncomendas = ({ addToCart }) => {
  let navigate = useNavigate();

  /*****************************************/
  /*           fetching encomendas         */
  /*****************************************/
  const [encomendas, setEncomendas] = useState([]);
  const [todasEncomendas, setTodasEncomendas] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/encomendas").then((res) => {
      setEncomendas(res.data);
      setTodasEncomendas(res.data);
    });
  }, []);
  console.log(encomendas);
  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <Notifications />
          <div className="contentWidth">
            <div className="heading d_flex">
              <h2>Encomendas</h2>
            </div>
            <div className="product-content  grid1">
              <Encomendas encomendas={encomendas} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainEncomendas;
