import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './common/header/Header';
import Pages from './pages/Pages';
import Data from './components/Data';
import Cart from './common/Cart/Cart';
import Footer from './common/footer/Footer';
import Sdata from './components/shops/Sdata';
import InfoArmazens from './pages/fornecedor/mainpage/InfoArmazens';
import InfoTransportes from './pages/transportador/main/InfoTransportes';
import InfoProdutos from './pages/categorias/main/InfoProdutos';
import SignIn from './pages/SignIn';
import Registar from './pages/registar';
import Transportador from './pages/transportador/transportador';
import Categorias from './pages/categorias/categorias';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Fornecedor from './pages/fornecedor/fornecedor';
import PerfilClient from './perfilclient';
// import PerfilClientHACKEADO from './pages/admin/PerfilClientHACKEADO';
import AddVeiculo from './addVeiculo';
import AddArmazem from './addArmazem';
import AddProduto from './addProduto';
import BoxProdutos from './pages/categorias/main/BoxProdutos';
import BoxArmazem from './pages/fornecedor/mainpage/BoxArmazem';
import Encomenda from './pages/encomendas/Encomenda';
import BoxEncomenda from './pages/encomendas/main/BoxEncomenda';
import ProtectedRoutes from './ProtectedRoutes';
import BoxVeiculo from './pages/transportador/main/BoxVeiculo';
import Endereco from './Endereco';
import Checkout from './checkout';
import Adminando from './pages/admin/Admin';

function App() {
  const THEME = createTheme({
    typography: {
      fontFamily: `"Poppins", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
  });
  const { productItems } = Data;
  const { shopItems } = Sdata;
  const { infoTransportes } = InfoTransportes;
  const { infoArmazens } = InfoArmazens;
  const { infoProdutos } = InfoProdutos;
  const [CartItem, setCartItem] = useState([]);

  const [artigo, setArtigo] = useState(infoProdutos);

  /*****************************************/
  /*           fetching produtos           */
  /*****************************************/
  const [produtos, setProdutos] = useState([]);
  const [todosprodutos, setTodosProdutos] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/produto/')
      .then((res) => {
        setProdutos(res.data);
        setTodosProdutos(res.data);
      })
      .then(function (data) {
        if (!localStorage.getItem('carrinho')) {
          localStorage.setItem('carrinho', '[]');
        }
      });
  }, []);

  const [searchInput, setSearchInput] = useState('');

  // console.log(todosprodutos[0].nome);
  // console.log(todosprodutos.nome);
  // console.log(todosprodutos.length);
  /*****************************************/
  /*           novo carrinho               */
  /*****************************************/
  localStorage.setItem('produtos', JSON.stringify(produtos));

  //criar variáveis //
  let produtosLS = JSON.parse(localStorage.getItem('produtos')); //products
  let carrinho = JSON.parse(localStorage.getItem('carrinho'));

  // filtrar por tipo //
  const categoriaArtigo = [...new Set(todosprodutos.map((Val) => Val.tipo))];

  const filterArtigo = (curcat) => {
    const newProduto = todosprodutos.filter((newVal) => {
      return newVal.tipo === curcat;
    });
    setProdutos(newProduto);
  };

  // filtrar por poluicao //
  const poluicaoFiltrada = [
    ...new Set(todosprodutos.map((Val) => Val.poluicao)),
  ];

  const filtrarPol = (curcat) => {
    const newProduto = todosprodutos.filter((newVal) => {
      return newVal.poluicao === curcat;
    });
    setProdutos(newProduto);
  };

  // filtrar por preco //
  const precoFiltrado = [...new Set(todosprodutos.map((Val) => Val.preco))];

  const filtrarPreco = (curcat) => {
    const newProduto = todosprodutos.filter((newVal) => {
      return newVal.preco === curcat;
    });
    setProdutos(newProduto);
  };

  // carrinho - NAO ESTÁ A SER NADA USADO MAS DÁ DEMASIADO TRABALHO TIRAR//
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
    console.log(productExit);
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };
  //

  return (
    <>
      <ThemeProvider theme={THEME}>
        <Router>
          <Header
            CartItem={CartItem}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Pages
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <Adminando
                  // produtos
                  produtos={produtos}
                  setProdutos={setProdutos}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  CartItem={CartItem}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                />
              }
            />
            <Route
              path="/login"
              element={
                <SignIn
                  CartItem={CartItem}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                />
              }
            />
            <Route
              path="/registar"
              element={
                <Registar
                  CartItem={CartItem}
                  addToCart={addToCart}
                  decreaseQty={decreaseQty}
                />
              }
            />
            <Route
              path="/categoria"
              element={
                <Categorias
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                  artigo={artigo}
                  categoriaArtigo={categoriaArtigo}
                  filterArtigo={filterArtigo}
                  filtrarPol={filtrarPol}
                  poluicaoFiltrada={poluicaoFiltrada}
                  filtrarPreco={filtrarPreco}
                  precoFiltrado={precoFiltrado}
                  setArtigo={setArtigo}
                  // addToCompare={addToCompare}
                  // removeFromCompare={removeFromCompare}
                  // selected={selected}
                  produtos={produtos}
                  setProdutos={setProdutos}
                  todosprodutos={todosprodutos}
                  //search
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
              }
            />
            <Route element={<ProtectedRoutes allowedRoles={'Transportador'} />}>
              <Route
                path="/transportador"
                element={
                  <Transportador
                    productItems={productItems}
                    addToCart={addToCart}
                    infoTransportes={infoTransportes}
                  />
                }
              />
              <Route
                path="/addTransportes"
                element={
                  <AddVeiculo
                    productItems={productItems}
                    addToCart={addToCart}
                    shopItems={shopItems}
                  />
                }
              />
              <Route
                path="/utilizador/veiculo"
                element={
                  <BoxVeiculo
                    productItems={productItems}
                    addToCart={addToCart}
                    shopItems={shopItems}
                  />
                }
              />
            </Route>
            <Route element={<ProtectedRoutes allowedRoles={'Fornecedor'} />}>
              <Route
                path="/fornecedor"
                element={
                  <Fornecedor
                    productItems={productItems}
                    addToCart={addToCart}
                    infoArmazens={infoArmazens}
                  />
                }
              />
              <Route
                path="/addProduto"
                element={
                  <AddProduto
                    productItems={productItems}
                    addToCart={addToCart}
                    shopItems={shopItems}
                  />
                }
              />
              <Route
                path="/armazem"
                element={
                  <BoxArmazem
                    produtos={produtos}
                    productItems={productItems}
                    addToCart={addToCart}
                    infoProdutos={infoProdutos}
                  />
                }
              />
              <Route
                path="/addArmazem"
                element={
                  <AddArmazem
                    productItems={productItems}
                    addToCart={addToCart}
                    shopItems={shopItems}
                  />
                }
              />
            </Route>
            <Route
              path="/checkout"
              element={
                <Endereco
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/perfilclient"
              element={
                <PerfilClient
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            />
            <Route
              path="/produto"
              element={
                <BoxProdutos
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                />
              }
            />
            <Route
              path="/encomendas"
              element={
                <Encomenda
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                />
              }
            />
            <Route
              path="/encomenda"
              element={
                <BoxEncomenda
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                  produtos={produtos}
                />
              }
            />
            <Route
              path="/checkoutconfirmation"
              element={
                <Checkout
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                />
              }
            />
            {/* <Route
              path="/perfilclientHACKEADO"
              element={
                <PerfilClientHACKEADO
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
                />
              }
            /> */}
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
