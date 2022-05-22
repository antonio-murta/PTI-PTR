import React from "react"
import { RiTruckFill } from "react-icons/ri";
import "./pizza.css"

const Notifications = () => {
  const data = [
    {
      cateName: "Preço inferior a 20€",
    },
    {
      cateName: "Poluição média inferior a 1kg",
    },
    {
      cateName: "Casual",
    },
    {
      cateName: "Formal",
    },
    {
      cateName: "Outdoor",
    },
    {
      cateName: "Calçado",
    },
  ]
  return (
    <>
      <div className='notifications'>
        <div className='chead d_flex'>
          <h1>Filtros</h1>
        </div>
        <div className="notification-container">
        <div className="boxes">
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <span>{value.cateName}</span>
            </div>
          )
        })}
        </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
