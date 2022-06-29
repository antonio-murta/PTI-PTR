import React, { useState, useEffect } from "react";
import Axios from "axios";
import Notifications from "./Notifications";
import Transportes from "./Transportes";
import "./style-transporte.css";
import { TiPlus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const MainTransportes = ({ addToCart, infoTransportes }) => {
  let navigate = useNavigate();

  /*****************************************/
  /*            fetching veículos          */
  /*****************************************/
  const [transportes, setTransportes] = useState([]);
  const [todostransportes, setTodosTransportes] = useState([]);
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/utilizador/veiculo").then((res) => {
  //     setTransportes(res.data);
  //     setTodosTransportes(res.data);
  //   });
  // }, []);

  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <Notifications />
          <div className="contentWidth">
            <div className="heading d_flex">
              <h2>Veículos</h2>
              <div className="new-transport">
                <button onClick={() => navigate("/addTransportes")}>
                  <div className="plus-icon">
                    <TiPlus />
                  </div>
                  Novo Veículo
                </button>
              </div>
            </div>
            <div className="product-content  grid1">
              <Transportes
                addToCart={addToCart}
                infoTransportes={infoTransportes}
                transportes={transportes}
                setTransportes={setTransportes}
                todostransportes={todostransportes}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainTransportes;
