import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import MainTransportes from "./main/MainTransportes";

const Transportador = ({ addToCart, infoTransportes }) => {
  return (
    <>
      <MainTransportes
        infoTransportes={infoTransportes}
        addToCart={addToCart}
      />
      <Wrapper />
    </>
  );
};

export default Transportador;
