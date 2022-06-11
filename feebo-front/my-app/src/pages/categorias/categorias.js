import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import MainProdutos from "./main/MainProdutos";

const Categorias = ({
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
      <MainProdutos
        infoProdutos={infoProdutos}
        addToCart={addToCart}
        artigo={artigo}
        categoriaArtigo={categoriaArtigo}
        filterArtigo={filterArtigo}
        setArtigo={setArtigo}
        produtos={produtos}
      />
      <Wrapper />
    </>
  );
};

export default Categorias;
