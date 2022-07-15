import React, { useState } from "react";
import "./pizza.css";
import { useNavigate } from "react-router-dom";
import ProductCard from "./TabelaProdutosC";
import { Item, Button } from "semantic-ui-react";

// npm install semantic-ui-react
// const Produtos = ({ artigo }) => {
const Produtos = ({
  artigo,
  produtos,
  produto,
  addToCompare,
  removeFromCompare,
  selected,
  searchInput,
  setSearchInput,
}) => {
  let navigate = useNavigate();
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const filtrarProdutos =
    searchInput === ''
      ? produtos
      : produtos.filter((produto) =>
          produto.nome
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(searchInput.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <>
      {filtrarProdutos.map((val, index) => {
        return (
          <div
            onClick={() => {
              navigate("/produto", {
                state: {
                  id: val._id,
                  name: val.nome,
                  preco: val.preco,
                  tipo: val.tipo,
                  subtipo: val.subtipo,
                  foto: val.foto,
                  poluicao: val.poluicao,
                  fornecedor: val.fornecedor,
                },
              });
            }}
            key={index}
            className="box1"
          >
            <div className="caixa2">
              <div className="item mtop">
                {/* <div className="fotos">
                  <img src={val.foto} alt="" />
                </div> */}
                <div className="product-details">
                  <h2>{val.nome}</h2>
                  <h4>{val.preco}€</h4>
                  <h3>{val.tipo}</h3>
                  <h3>{val.subtipo}</h3>
                  <h3>Poluição média: {val.poluicao}gCO2/km</h3>
                  {/* <ProductCard
                    produto={produto}
                    addToCompare={addToCompare}
                    removeFromCompare={removeFromCompare}
                    selected={selected}
                  /> */}
                  {/* <Item.Extra>
                    {selected && selected.includes(produto) ? (
                      <Button
                        color="red"
                        onClick={() => removeFromCompare(produto)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        color="blue"
                        onClick={() => addToCompare(produto)}
                      >
                        Compare
                      </Button>
                    )}
                  </Item.Extra> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Produtos;
