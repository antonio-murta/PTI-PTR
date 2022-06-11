import React, { useState } from "react";
import "./../../categorias/main/ProdutoIndividual.css";
import { useLocation } from "react-router-dom";

const BoxArmazem = () => {
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
              <div className="heading">
                <h2>{location.state.name}</h2>
              </div>
              <p>Localização: {location.state.local}</p>
              <p>Poluição: {location.state.poluicao}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoxArmazem;
