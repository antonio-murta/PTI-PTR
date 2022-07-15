import React from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import MainProdutos from './main/MainProdutos';

const Categorias = ({
  addToCart,
  infoProdutos,
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
  searchInput,
  setSearchInput,
}) => {
  return (
    <>
      <MainProdutos
        infoProdutos={infoProdutos}
        addToCart={addToCart}
        artigo={artigo}
        categoriaArtigo={categoriaArtigo}
        filterArtigo={filterArtigo}
        filtrarPol={filtrarPol}
        poluicaoFiltrada={poluicaoFiltrada}
        filtrarPreco={filtrarPreco}
        precoFiltrado={precoFiltrado}
        setArtigo={setArtigo}
        produtos={produtos}
        setProdutos={setProdutos}
        todosprodutos={todosprodutos}
        //search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Wrapper />
    </>
  );
};

export default Categorias;
