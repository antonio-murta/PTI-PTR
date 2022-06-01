import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import InfoArmazens from "./pages/fornecedor/mainpage/InfoArmazens";
import InfoTransportes from "./pages/transportador/main/InfoTransportes";
import InfoProdutos from "./pages/categorias/main/InfoProdutos";
import SignIn from "./pages/login";
import Registar from "./pages/registar";
import Transportador from "./pages/transportador/transportador";
import Categorias from "./pages/categorias/categorias";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fornecedor from "./pages/fornecedor/fornecedor";
import PerfilClient from "./perfilclient";
import AddTransportador from "./addTransportes";
import AddArmazem from "./addArmazem";
import Produtos from "./pages/produtos/Produtos";
import Produto from "./pages/produtos/main/Produto";


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


  if(!localStorage.getItem('loggedin') && localStorage.getItem('loggedin')=='') {
    console.log(localStorage.getItem('loggedin'));  
    return <SignIn />
  }
  else{
    return <PerfilClient />
  }

  return (
    <>
      <ThemeProvider theme={THEME}>
        <Router>
          <Header CartItem={CartItem} />
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
                />
              }
            />
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
              path="/addTransportes"
              element={
                <AddTransportador
                  productItems={productItems}
                  addToCart={addToCart}
                  shopItems={shopItems}
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
            <Route
              path="/produtos"
              element={
                <Produtos
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                />
              }
            />
            <Route
              path="/produto"
              element={
                <Produto
                  productItems={productItems}
                  addToCart={addToCart}
                  infoProdutos={infoProdutos}
                />
              }
            />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
