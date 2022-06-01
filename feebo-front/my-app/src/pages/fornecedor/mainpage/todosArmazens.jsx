import React, { useState } from "react";
import { RiSettings3Fill } from "react-icons/ri";
import "./style-armazens.css";

const Armazens = ({ infoArmazens, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {infoArmazens.map((item, index) => {
        return (
          <div key={index} className="box">
            <div className="transport">
              <div className="product-details">
                <h3>{item.name}</h3>
                <h3>Local: {item.saida}</h3>
                <h3> {item.chegada}</h3>
                <div className="settings">
                  <button onClick={() => addToCart(item)}>
                    <div className="setts">
                      <RiSettings3Fill />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Armazens;
