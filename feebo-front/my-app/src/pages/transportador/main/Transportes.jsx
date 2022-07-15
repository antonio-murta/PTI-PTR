import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style-transporte.css";
import axios from "axios";

const Transportes = ({ veiculos }) => {
  let navigate = useNavigate();

  const [veiculosTransportador, setVeiculosTransportador] = useState([]);

  useEffect(() => {
    const getVeiculosTransportador = async (id) => {
      try {
        await axios
          .get("http://localhost:3001/veiculos/transportador/" + id)
          .then((res) => {
            console.log(res.data);

            res.data.map((veiculo_id) => {
              console.log(veiculo_id);
              axios
                .get("http://localhost:3001/veiculo/" + veiculo_id)
                .then((response) => {
                  console.log(response.data);
                  setVeiculosTransportador((veiculosTransportador) => [
                    ...veiculosTransportador,
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
    getVeiculosTransportador(cliente);
  }, []);

  return (
    <>
      {veiculosTransportador.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate("/utilizador/veiculo", {
                state: {
                  id: val._id,
                  matricula: val.matricula,
                  marca: val.marca,
                  modelo: val.modelo,
                  poluicao: val.poluicao,
                  veiculos: veiculos,
                },
              });
            }}
            key={index}
            className="box"
          >
            <div className="transport">
              <div className="details">
                <h2>Carro: {val.matricula}</h2>
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
