import React from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import MainProdutos from './main/MainProdutos';

const Categorias = ({
  addToCart,
  infoProdutos,
  artigo,
  categoriaArtigo,
  filterArtigo,
  setArtigo,
}) => {
  return (
    <>
      <MainProdutos
        infoProdutos={infoProdutos}
        addToCart={addToCart}
        artigo={artigo}
        categoriaArtigo={categoriaArtigo}
        filterArtigo={filterArtigo}
        setArtigo={setArtigo}
      />
      <Wrapper />
    </>
  );
};

export default Categorias;
