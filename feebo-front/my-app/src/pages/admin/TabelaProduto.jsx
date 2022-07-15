import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TabelaProduto = () => {
  let navigate = useNavigate();
  const [utilizadores, setUtilizadores] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/utilizador/').then((res) => {
      setUtilizadores(res.data);
    });
  }, []);

  return (
    <>
      <Table celled fixed unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
            <Table.HeaderCell>NIF</Table.HeaderCell>
            <Table.HeaderCell>Morada</Table.HeaderCell>
            <Table.HeaderCell>Telemovel</Table.HeaderCell>
            <Table.HeaderCell>Tipo de Utilizador</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      {utilizadores.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate('/perfilclientHACKEADO', {
                state: {
                  id: val._id,
                  nome: val.nome,
                  dataNasc: val.dataNasc,
                  nif: val.nif,
                  morada: val.morada,
                  telemovel: val.telemovel,
                  utipo: val.utipo,
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
                      <Table.Cell>{val.id} </Table.Cell>
                      <Table.Cell>{val.nome} </Table.Cell>
                      <Table.Cell>{val.dataNasc}gCO2/km</Table.Cell>
                      <Table.Cell>{val.nif}</Table.Cell>
                      <Table.Cell>{val.morada}</Table.Cell>
                      <Table.Cell>{val.telemovel}</Table.Cell>
                      <Table.Cell>{val.utipo}</Table.Cell>
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

export default TabelaProduto;
