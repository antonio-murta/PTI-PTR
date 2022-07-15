import React, { useState, useEffect } from "react";
import "./style-armazens.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Armazens = ({ armazens }) => {
  let navigate = useNavigate();

  const [armazensFornecedor, setArmazensFornecedor] = useState([]);

  useEffect(() => {
    const getArmazensFornecedor = async (id) => {
      try {
        await axios
          .get("http://localhost:3001/armazens/fornecedor/" + id)
          .then((res) => {
            console.log(res.data);

            res.data.map((armazem_id) => {
              console.log(armazem_id);
              axios
                .get("http://localhost:3001/armazem/" + armazem_id)
                .then((response) => {
                  console.log(response.data);
                  setArmazensFornecedor((armazensFornecedor) => [
                    ...armazensFornecedor,
                    response.data,
                  ]);
                });
            });
          });
      } catch (error) {
        console.log(error);
      }
    };

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    let cliente = getCookie("UserName");
    getArmazensFornecedor(cliente);
  }, []);
  return (
    <>
      {armazensFornecedor.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate("/armazem", {
                state: {
                  id: val._id,
                  name: val.nome,
                  local: val.morada,
                  poluicao: val.poluicao,
                  telemovel: val.telemovel,
                  tipo: val.tipo,
                  produtos: val.produtos,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="armazem">
              <div className="details">
                <h2>{val.nome}</h2>
                <h3>Tipo: {val.tipo}</h3>
                <h3>Local: {val.morada}</h3>
                <h3>Poluição: {val.poluicao}gCO2/km</h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Armazens;
