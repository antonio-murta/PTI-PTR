import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Moda",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Eletrónicos",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Carros",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Casa & Jardim",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Prendas",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Música",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Saúde & Beleza",
    },
    {
      cateImg: "./images/category/cat8.png",
      cateName: "Animais",
    },
    {
      cateImg: "./images/category/cat9.png",
      cateName: "Brinquedos",
    },
    {
      cateImg: "./images/category/cat10.png",
      cateName: "Mercearia",
    },
    {
      cateImg: "./images/category/cat11.png",
      cateName: "Livros",
    },
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
