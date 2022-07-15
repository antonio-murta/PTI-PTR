import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style-encomendas.css";
import axios from "axios";

const Encomendas = ({ encomendas }) => {
  let navigate = useNavigate();

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

  const [encomendasUser, setEncomendasUser] = useState([]);

  useEffect(() => {
    let cliente = getCookie("UserName");
    let utipo = getCookie("UTipo");
    const getEncomendasUser = async (id) => {
      try {
        await axios.get("http://localhost:3001/encomendas").then((res) => {
          console.log(res.data);

          if (utipo === "Consumidor") {
            setEncomendasUser(
              res.data.filter((encomenda) => encomenda.cliente === id)
            );
          }
          if (utipo === "Fornecedor") {
            res.data.map((encomenda) => {
              let produtos = encomenda.produtos;
              produtos.map((produto) => {
                if (produto.fornecedor === cliente) {
                  console.log(encomenda);
                  setEncomendasUser((encomendasUser) => [
                    ...encomendasUser,
                    encomenda,
                  ]);
                }
              });
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getEncomendasUser(cliente);
  }, []);

  console.log(",", encomendasUser);

  return (
    <>
      {encomendasUser.map((val, index) => {
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
                <h2>ID: {val.id}</h2>
                <h3>Cliente: {val.cliente}</h3>
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
