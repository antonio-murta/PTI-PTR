import React, { useState } from "react";
import "./style-produtos.css";
import { useNavigate } from "react-router-dom";

const Produtos = ({ infoProdutos }) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {infoProdutos.map((item, index) => {
        return (
          <div
            onClick={() => {
              navigate("/produto", {
                state: {
                  name: item.name,
                  preco: item.preco,
                  tipo: item.tipo,
                  subtipo: item.subtipo,
                  foto: item.foto,
                  poluicao: item.poluicao,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="transport mtop">
              <div className="product-details">
                <h3>{item.name}</h3>
                <h3>Preço: {item.preco}</h3>
                <h3>Tipo: {item.tipo}</h3>
                <h3>Subtipo: {item.subtipo}</h3>
                <h3>Poluição: {item.poluicao}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Produtos;
