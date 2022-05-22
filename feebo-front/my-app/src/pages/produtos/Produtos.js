import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import MainProdutos from "./main/MainProdutos";

const Produtos = ({ addToCart, infoProdutos }) => {
  return (
    <>
      <MainProdutos infoProdutos={infoProdutos} addToCart={addToCart} />
      <Wrapper />
    </>
  );
};

export default Produtos;
