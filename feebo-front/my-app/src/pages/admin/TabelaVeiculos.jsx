import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TabelaVeiculos = () => {
  let navigate = useNavigate();

  const [veiculos, setVeiculos] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/veiculos').then((res) => {
      setVeiculos(res.data);
    });
  }, []);

  return (
    <>
      <Table celled fixed unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Matricula</Table.HeaderCell>
            <Table.HeaderCell>Marca</Table.HeaderCell>
            <Table.HeaderCell>Modelo</Table.HeaderCell>
            <Table.HeaderCell>Poluição</Table.HeaderCell>
            <Table.HeaderCell>Em Utilizacão</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      {veiculos.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate('/', {
                state: {
                  matricula: val.matricula,
                  marca: val.marca,
                  modelo: val.modelo,
                  poluicao: val.poluicao,
                  utilizacao: val.utilizacao,
                },
              });
            }}
            key={index}
          >
            <Table celled fixed unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{val.matricula} </Table.Cell>
                      <Table.Cell>{val.marca} </Table.Cell>
                      <Table.Cell>{val.modelo}</Table.Cell>
                      <Table.Cell>{val.poluicao}gCO2/km</Table.Cell>
                      <Table.Cell>{val.utilizacao}</Table.Cell>
                      <Table.Cell>{val.quantidade}</Table.Cell>
                      <Table.Cell>{val.fornecedor}</Table.Cell>
                      <Table.Cell>{val.armazem}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Row>
              </Table.Header>
            </Table>
          </div>
        );
      })}
    </>
  );
};

export default TabelaVeiculos;
