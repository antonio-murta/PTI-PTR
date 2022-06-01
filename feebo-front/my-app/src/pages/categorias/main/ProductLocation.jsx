import React, { useState } from "react";
import "./ProdutoIndividual.css";
import { useLocation } from "react-router-dom";

const ProductLocation = () => {
  let location = useLocation();
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
              <div className="type">
                {location.state.tipo} {">"} {location.state.subtipo}
              </div>
              <p className="price">{location.state.preco}</p>
              <p>Poluição: {location.state.poluicao}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductLocation;
