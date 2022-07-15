import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TabelaArmazem = () => {
  let navigate = useNavigate();
  const [armazensFornecedor, setArmazensFornecedor] = useState([]);
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    const getArmazensFornecedor = async (id) => {
      try {
        await Axios.get('http://localhost:3001/armazens/fornecedor/' + id).then(
          (res) => {
            console.log(res.data);

            res.data.map((armazem_id) => {
              console.log(armazem_id);
              Axios.get('http://localhost:3001/armazem/' + armazem_id).then(
                (response) => {
                  console.log(response.data);
                  setArmazensFornecedor((armazensFornecedor) => [
                    ...armazensFornecedor,
                    response.data,
                  ]);
                }
              );
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <Table celled fixed unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Local</Table.HeaderCell>
              <Table.HeaderCell>Poluição</Table.HeaderCell>
              <Table.HeaderCell>Tipo</Table.HeaderCell>
              <Table.HeaderCell>Telemovel</Table.HeaderCell>
              <Table.HeaderCell>Tipo</Table.HeaderCell>
              <Table.HeaderCell>Produtos</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        {armazensFornecedor.map((val, index) => {
          return (
            <div
              onClick={() => {
                navigate('/', {
                  state: {
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
            >
              <Table celled fixed unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>{val.nome} </Table.Cell>
                        <Table.Cell>{val.preco}€ </Table.Cell>
                        <Table.Cell>{val.poluicao}gCO2/km</Table.Cell>
                        <Table.Cell>{val.tipo}</Table.Cell>
                        <Table.Cell>{val.subtipo}</Table.Cell>
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
  });
};

export default TabelaArmazem;
