import React, { useState, useEffect } from "react";
import Axios from "axios";
import Filtro from "./Filtrar";
import Produtos from "./Produtos";
import "./pizza.css";

const MainProdutos = ({
  addToCart,
  infoProdutos,
  artigo,
  categoriaArtigo,
  filterArtigo,
  setArtigo,
  produtos,
}) => {
  return (
    <>
      <section className="shop background-filtromoda">
        <div className="container1 d_flex1">
          <Filtro
            categoriaArtigo={categoriaArtigo}
            filterArtigo={filterArtigo}
            setArtigo={setArtigo}
          />
          <div className="contentWidth">
            <div className="heading d_flex">
              <div className="heading-left row  f_flex">
                <h2>Moda</h2>
              </div>
            </div>
            <div className="product-content  grid1">
              <Produtos artigo={artigo} produtos={produtos} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProdutos;
