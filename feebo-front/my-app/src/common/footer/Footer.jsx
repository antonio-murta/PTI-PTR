import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container grid2">
          <div className="box">
            <h1>Feeboo</h1>
            <p>Texto random a falar sobre o website</p>
          </div>

          <div className="box">
            <h2>Sobre nós</h2>
            <ul>
              <li>Vendedores</li>
              <li>Fornecedores</li>
              <li>Transportadores</li>
              <li>Termos e Condições</li>
              <li>Politica de Privacidade</li>
            </ul>
          </div>
          <div className="box">
            <h2>Serviço a Clientes</h2>
            <ul>
              <li>Centro de Ajuda </li>
              <li>Métodos de Pagamento </li>
              <li>Seguir a sua Ecomenda </li>
              <li>Inscrever a sua Empresa</li>
              <li>Trocas e Devoluções</li>
            </ul>
          </div>
          <div className="box">
            <h2>Como nos contactar?</h2>
            <ul>
              <li>Campo Grande 016, 1749-016 Lisboa </li>
              <li>Email: feeboo@gmail.com</li>
              <li>Numero Telefónico: +351 925 293 132</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
