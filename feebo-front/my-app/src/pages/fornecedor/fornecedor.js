import React from 'react';
import Main from '../../pages/fornecedor/mainpage/mainpage';
import Wrapper from '../../components/wrapper/Wrapper';

const Fornecedor = ({
  productItems,
  addToCart,
  CartItem,
  infoArmazens,
  armazens,
  setArmazens,
  todosarmazens,
}) => {
  return (
    <>
      <Main
        infoArmazens={infoArmazens}
        addToCart={addToCart}
        armazens={armazens}
        setArmazens={setArmazens}
        todosarmazens={todosarmazens}
      />
      <Wrapper />
    </>
  );
};

export default Fornecedor;
