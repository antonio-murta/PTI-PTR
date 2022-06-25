import React, { useState } from "react";
import "./style-armazens.css";
import { useNavigate } from "react-router-dom";

const Armazens = ({ infoArmazens, addToCart }) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {infoArmazens.map((item, index) => {
        return (
          <div
            onClick={() => {
              navigate("/armazem", {
                state: {
                  name: item.name,
                  local: item.saida,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="transport">
              <div className="details">
                <h3>{item.name}</h3>
                <h3>Local: {item.saida}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Armazens;
