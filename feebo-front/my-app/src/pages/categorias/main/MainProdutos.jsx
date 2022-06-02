import React, { useState } from 'react';
import Filtro from './Filtrar';
import Produtos from './Produtos';
import Procura from './procurar';
import { AiOutlinePlus } from 'react-icons/ai';
import './pizza.css';

const MainProdutos = ({
  addToCart,
  infoProdutos,
  artigo,
  categoriaArtigo,
  filterArtigo,
  setArtigo,
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
                <
              </div>
            </div>
            <div className="product-content  grid1">
              <Produtos artigo={artigo} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProdutos;
