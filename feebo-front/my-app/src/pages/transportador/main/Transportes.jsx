import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style-transporte.css";

const Transportes = ({ veiculos }) => {
  let navigate = useNavigate();

  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <>
      {veiculos.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate("/utilizador/veiculo", {
                state: {
                  id: val._id,
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
                <h2>Carro: {val._id}</h2>
                <h3>Poluição: {val.poluicao}gCO2/km</h3>
                <h3>Marca: {val.marca}</h3>
                <h3>Modelo: {val.modelo}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Transportes;
