import React, { useState, useEffect } from "react";
import Axios from "axios";
import Notifications from "./notifications";
import Armazens from "./Armazens";
import { AiOutlinePlus } from "react-icons/ai";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Main = ({ addToCart, infoArmazens }) => {
  let navigate = useNavigate();

  /*****************************************/
  /*           fetching armazens        */
  /*****************************************/
  const [armazens, setArmazens] = useState([]);
  const [todosarmazens, setTodosArmazens] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/armazem").then((res) => {
      setArmazens(res.data);
      setTodosArmazens(res.data);
    });
  }, []);

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
              <Armazens
                addToCart={addToCart}
                infoArmazens={infoArmazens}
                armazens={armazens}
                setArmazens={setArmazens}
                todosarmazens={todosarmazens}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
