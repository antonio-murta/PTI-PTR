import React from "react";
import Notifications from "./notifications";
import Armazens from "./todosArmazens";
import { AiOutlinePlus } from "react-icons/ai";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Main = ({ addToCart, infoArmazens }) => {
  let navigate = useNavigate();
  return (
    <>
      <section className="shop background">
        <div className="container d_flex">
          <Notifications />
          <div className="contentWidth">
            <div className="heading d_flex">
              <h2>Armazéns</h2>
              <div className="new-transport">
                <button onClick={() => navigate("/addArmazem")}>
                  <div className="plus-icon">
                    <AiOutlinePlus />
                  </div>
                  Novo Armazém
                </button>
              </div>
            </div>
            <div className="product-content  grid1">
              <Armazens addToCart={addToCart} infoArmazens={infoArmazens} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
