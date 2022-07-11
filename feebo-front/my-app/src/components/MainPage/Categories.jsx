import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const data = [
    {
      id: 1,
      cateImg: './images/category/cat1.png',
      cateName: 'Registar conta',
    },
    {
      id: 2,
      cateImg: './images/category/cat2.png',
      cateName: 'Login',
    },
    {
      id: 3,
      cateImg: './images/category/cat3.png',
      cateName: 'Ver produtos!',
    },
    // {
    //   id: 4,
    //   cateImg: './images/category/cat4.png',
    //   cateName: 'Casa & Jardim',
    // },
    // {
    //   id: 5,
    //   cateImg: './images/category/cat5.png',
    //   cateName: 'Prendas',
    // },
    // {
    //   id: 6,
    //   cateImg: './images/category/cat6.png',
    //   cateName: 'Música',
    // },
    // {
    //   id: 7,
    //   cateImg: './images/category/cat7.png',
    //   cateName: 'Saúde & Beleza',
    // },
    // {
    //   id: 8,
    //   cateImg: './images/category/cat8.png',
    //   cateName: 'Animais',
    // },
    // {
    //   id: 9,
    //   cateImg: './images/category/cat9.png',
    //   cateName: 'Brinquedos',
    // },
    // {
    //   id: 10,
    //   cateImg: './images/category/cat10.png',
    //   cateName: 'Mercearia',
    // },
    // {
    //   id: 11,
    //   cateImg: './images/category/cat11.png',
    //   cateName: 'Livros',
    // },
  ];

  return (
    <>
      <div className="category">
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
