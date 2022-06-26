import React from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import MainTransportes from './main/MainTransportes';

const Transportador = ({
  addToCart,
  infoTransportes,
  setTransportes,
  todostransportes,
  transportes,
}) => {
  return (
    <>
      <MainTransportes
        infoTransportes={infoTransportes}
        addToCart={addToCart}
        transportes={transportes}
        setTransportes={setTransportes}
        todostransportes={todostransportes}
      />
      <Wrapper />
    </>
  );
};

export default Transportador;
