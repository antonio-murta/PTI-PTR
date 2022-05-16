import React from "react"
import { RiTruckFill } from "react-icons/ri";
import "./style-transporte.css"

const Notifications = () => {
  const data = [
    {
      notif: "Transporte 1 saiu do Armazém X",
      icon: <RiTruckFill/>,
      time: "5m",
    },
    {
      notif: "Transporte 2 chegou ao Armazém Y",
      icon: <RiTruckFill/>,
      time: "24m",
    },
    {
      notif: "Transporte 3 chegou ao Armazém Z",
      icon: <RiTruckFill/>,
      time: "2h",
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
              <span>{value.notif}</span>
{/*               <div className="time">{value.time} </div>
 */}            </div>
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
