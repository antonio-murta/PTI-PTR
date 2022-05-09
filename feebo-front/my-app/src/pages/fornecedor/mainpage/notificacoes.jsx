import React from "react"
import "./style.css"

const Notif = () => {
  const data = [
    {
        temaNotif: "Armazém A",
        infoNotif: "Novos produtos a caminho",
        tempoNotif: "5m",
    },
    {
        temaNotif: "Armazém B",
        infoNotif: "Transporte de batatas começou",
        tempoNotif: "2h",
    },
    {
        temaNotif: "Encomenda",
        infoNotif: "Encomenda não aceite",
        tempoNotif: "4d",
    },
  ]
  return (
    <>
      <div className='notificações'>
        <div className='chead d_flex'>
          <h1>Notificações </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box noti_flex' key={index}>
              <span>{value.temaNotif}</span>
              <span>{value.infoNotif}</span>
              <span className="tempo">{value.tempoNotif}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>Ver todas as notificações</button>
        </div>
      </div>
    </>
  )
}

export default Notif
