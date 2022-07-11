import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  let navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  //const { current: currentCartItems } = useRef(cartItems);

  const [total, setTotal] = useState(0);
  const [totalPol, setTotalPol] = useState(0);

  let carrinho = JSON.parse(localStorage.getItem('carrinho'));

  function addCarrinho(produtoId) {
    // if (carrinho.some(item => val.name === item.name)
    carrinho.push(produtoId);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    setCartItems(carrinho);
  }

  function removerCarrinho(produtoId) {
    let temp = carrinho.filter((item) => item.id != produtoId);
    localStorage.setItem('carrinho', JSON.stringify(temp));
    setCartItems(temp);
  }

  // dinheiro total do carrinho//
  function dinheiroTotal() {
    carrinho.map((item) => {
      setTotal(total + parseFloat(item.preco));
    });
  }

  function poluicaoTotal() {
    carrinho.map((item) => {
      setTotalPol(total + parseFloat(item.poluicao));
    });
  }

  useEffect(() => {
    if (carrinho) {
      setCartItems(carrinho);
      // Adicionar Total
      let totalCart = 0;
      carrinho.map((item) => {
        totalCart = totalCart + parseFloat(item.preco);
      });
      setTotal(totalCart);

      let polCart = 0;
      carrinho.map((item) => {
        polCart = polCart + parseFloat(item.poluicao);
      });
      setTotalPol(polCart);
    }
  }, [carrinho]);

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {cartItems.length === 0 && (
              <h1 className="no-items product">
                Não tem produtos no seu carrinho
              </h1>
            )}

            {cartItems.map((item) => {
              // const productQty = item.price * item.qty;
              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.foto} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h4>
                      {item.preco}€ * {item.qty}
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addCarrinho(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => removerCarrinho(item.id)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Suas compras</h2>
            <div className=" d_flex">
              <h4>Valor final :</h4>
              <h3>{total}€</h3>
            </div>
            <div className=" d_flex">
              <h4>Poluição total :</h4>
              <h3>{totalPol}gCO2</h3>
            </div>
            <Button
              style={{
                backgroundColor: '#e94560',
              }}
              className="button"
              variant="contained"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
