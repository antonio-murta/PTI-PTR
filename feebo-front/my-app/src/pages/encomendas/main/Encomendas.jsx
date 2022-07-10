import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style-encomendas.css";

const Encomendas = ({ encomendas }) => {
  let navigate = useNavigate();

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  console.log(encomendas);
  return (
    <>
      {encomendas.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate("/encomenda", {
                state: {
                  id: val._id,
                  matricula: val.matricula,
                  marca: val.marca,
                  modelo: val.modelo,
                  poluicao: val.poluicao,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="transport">
              <div className="details">
                <h2>ID: {val.matricula}</h2>
                <h3>Poluição: {val.poluicao} x gCO2/km</h3>
                <h3>Armazém de origem: {val.marca}</h3>
                <h3>Fornecedor: {val.modelo}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Encomendas;
