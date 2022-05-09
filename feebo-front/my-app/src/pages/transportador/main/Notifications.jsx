import React from "react"
import { RiTruckFill } from "react-icons/ri";

const Notifications = () => {
  const data = [
    {
      cateName: "Transporte 1 saiu do Armazém X",
      icon: <RiTruckFill/>,
    },
    {
      cateName: "Transporte 2 chegou ao Armazém Y",
      icon: <RiTruckFill/>,
      //cateImg: "./images/category/cat-2.png",
    },
  ]
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Notificações</h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <div className="icon">{value.icon} </div>
              <span>{value.cateName}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>Ver mais</button>
        </div>
      </div>
    </>
  )
}

export default Notifications
