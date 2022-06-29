import React from "react";
import Notifications from "./Notifications";
import Transportes from "./Transportes";
import "./style-transporte.css";
import { TiPlus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const MainTransportes = ({ addToCart, infoTransportes }) => {
  let navigate = useNavigate();
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
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainTransportes;
