import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import MainEncomendas from "./main/MainEncomendas";

const Encomendar = ({ addToCart }) => {
  return (
    <>
      <MainEncomendas addToCart={addToCart} />
      <Wrapper />
    </>
  );
};

export default Encomendar;
