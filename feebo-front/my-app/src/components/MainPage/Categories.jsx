import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const registar = [
    {
      id: 1,
      cateImg: './images/category/registar.png',
      cateName: 'Registar conta',
    },
  ];
  const login = [
    {
      id: 1,
      cateImg: './images/category/login.png',
      cateName: 'Fazer login',
    },
  ];

  const data = [
    {
      id: 1,
      cateImg: './images/category/compras.png',
      cateName: 'Ver produtos',
    },
  ];
  return (
    <>
      <div className="category">
        {registar.map((value, index) => {
          return (
            <Link to="/registar" key={index}>
              <div className="box f_flex">
                <img src={value.cateImg} alt="" />
                <span>{value.cateName}</span>
              </div>
            </Link>
          );
        })}
        {login.map((value, index) => {
          return (
            <Link to="/login" key={index}>
              <div className="box f_flex">
                <img src={value.cateImg} alt="" />
                <span>{value.cateName}</span>
              </div>
            </Link>
          );
        })}
        {data.map((value, index) => {
          return (
            <Link to="/categoria" key={index}>
              <div className="box f_flex">
                <img src={value.cateImg} alt="" />
                <span>{value.cateName}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
