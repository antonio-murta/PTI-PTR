import React, { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { useNavigate } from "react-router";
import "./style-transporte.css";

const Transportes = ({ infoTransportes, addToCart, transportes }) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  console.log(transportes);
  return (
    <>
      {transportes.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate("/utilizador/veiculo", {
                state: {
                  id: val.matricula,
                  name: val.marca,
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
                <h3>Carro: {val.matricula}</h3>
                <h3>Poluição: {val.poluicao}</h3>
                <h3>Marca: {val.marca}</h3>
                <h3>Modelo: {val.modelo}</h3>
                {/* <div className="settings">
                  <button onClick={() => addToCart(val)}>
                    <div className="setts">
                      <CgTrash />
                    </div>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Transportes;
