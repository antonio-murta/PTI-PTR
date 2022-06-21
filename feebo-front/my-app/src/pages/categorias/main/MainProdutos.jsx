import React, { useState, useEffect } from "react";
import Filtro from "./Filtrar";
import Produtos from "./Produtos";
import "./pizza.css";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const MainProdutos = ({
  artigo,
  categoriaArtigo,
  filterArtigo,
  setArtigo,
  produtos,
}) => {
  let navigate = useNavigate();
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
            <div className="heading">
              <h2>Moda</h2>
              <div className="new-product">
                <button onClick={() => navigate("/addProduto")}>
                  <div className="plus-icon">
                    <AiOutlinePlus />
                  </div>
                  Novo Produto
                </button>
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
