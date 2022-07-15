import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Filtro from './Filtrar';
import Produtos from './Produtos';
import ProductComparison from './CompararProdutos';
import './pizza.css';
import { useNavigate } from 'react-router-dom';

const MainProdutos = ({
  artigo,
  categoriaArtigo,
  filterArtigo,
  filtrarPol,
  poluicaoFiltrada,
  filtrarPreco,
  precoFiltrado,
  setArtigo,
  produtos,
  setProdutos,
  todosprodutos,
  addToCompare,
  searchInput,
  setSearchInput,
}) => {
  let navigate = useNavigate();

  return (
    <>
      <section className="shop background-filtromoda">
        <div className="container1 d_flex1">
          <Filtro
            filtrarPol={filtrarPol}
            poluicaoFiltrada={poluicaoFiltrada}
            filtrarPreco={filtrarPreco}
            precoFiltrado={precoFiltrado}
            produtos={produtos}
            setProdutos={setProdutos}
            todosprodutos={todosprodutos}
            categoriaArtigo={categoriaArtigo}
            filterArtigo={filterArtigo}
            setArtigo={setArtigo}
          />
          <div className="contentWidth">
            <div className="heading">
              <h2>Produtos</h2>
            </div>
            {/* <div className="tabelaComparar">
              <ProductComparison produtos={produtos}></ProductComparison>
            </div> */}
            <div className="product-content  grid1">
              <Produtos
                artigo={artigo}
                produtos={produtos}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProdutos;
