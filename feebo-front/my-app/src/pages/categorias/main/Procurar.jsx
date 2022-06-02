import React, { useState } from 'react';
import './pizza.css';
import InfoProdutos from './InfoProdutos';

function Procura() {
  const [searchTerm, setSearchTerm] = useState('');
  const { infoProdutos } = InfoProdutos;
  const { name } = infoProdutos;
  return (
    <div className="procura">
      <input type="text" placeholder="Procurar" />;
      {InfoProdutos.filter((val) => {
        if (searchTerm == '') {
          return val;
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((name, key) => {})}
    </div>
  );
}

export default Procura;
