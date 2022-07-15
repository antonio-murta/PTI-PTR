import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const meita = [
  {
    text: 'Produtos',
  },
  {
    text: 'Encomendas',
  },
];

const DropdownEpico = () => (
  <Dropdown
    placeholder="Selecionar Informação a Visualizar"
    fluid
    selection
    options={meita}
  />
);

export default DropdownEpico;
