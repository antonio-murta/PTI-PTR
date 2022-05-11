import React from "react"
import { RiTruckFill } from "react-icons/ri";
import "./style.css"

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
    {
      cateName: "Transporte 3 chegou ao Armazém Z",
      icon: <RiTruckFill/>,
      //cateImg: "./images/category/cat-2.png",
    },
  ]
  return (
    <>
      <div className='notifications'>
        <div className='chead d_flex'>
          <h1>Notificações</h1>
        </div>
        <div className="notification-container">
        <div className="boxes">
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <div className="icon">{value.icon} </div>
              <span>{value.cateName}</span>
            </div>
          )
        })}
        </div>
        <div className='box see-more'>
          <button>Ver mais</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
