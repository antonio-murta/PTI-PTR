import React, { useState } from "react";
import "./style-produtos.css";
import "./style-produto.css";
import { useLocation } from "react-router-dom";

const Produto = () => {
  let location = useLocation();
  console.log(location.state);
  return (
    <div>
      {location.state.name},{location.state.preco}
    </div>

    /*     <div>

    </div> */
  );
};

export default Produto;
