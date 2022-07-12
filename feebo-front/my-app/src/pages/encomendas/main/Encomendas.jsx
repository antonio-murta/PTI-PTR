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
                  cliente: val.cliente,
                  nome: val.nome,
                  morada: val.morada,
                  cidade: val.cidade,
                  distrito: val.distrito,
                  codigo_postal: val.codigo_postal,
                  pais: val.pais,
                  produtos: val.produtos,
                  poluicao: val.poluicao,
                  pagamento: val.pagamento,
                  data: val.data_inicio,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="transport">
              <div className="details">
                <h2>ID: {val.nome}</h2>
                <h3>Poluição: {val.morada}</h3>
                <h3>Armazém de origem: {val.cidade}</h3>
                <h3>Fornecedor: {val.pais}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Encomendas;
