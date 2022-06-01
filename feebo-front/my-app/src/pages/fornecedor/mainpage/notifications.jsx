import React from "react";
import "./style-armazens.css";
import { RiTruckFill } from "react-icons/ri";

const Notifications = () => {
  const data = [
    {
      notif: "Armazém X - novos produtos a caminho",
      icon: <RiTruckFill />,
      time: "5m",
    },
    {
      notif: "Armazém Y - transporte de batatas começou",
      icon: <RiTruckFill />,
      time: "2h",
    },
    {
      notif: "Encomenda NR58Z - encomenda não aceite",
      icon: <RiTruckFill />,
      time: "4d",
    },
  ];
  return (
    <>
      <div className="notifications">
        <div className="chead d_flex">
          <h1>Notificações</h1>
        </div>
        <div className="notification-container">
          <div className="boxes">
            {data.map((value, index) => {
              return (
                <div className="box f_flex" key={index}>
                  <div className="icon">{value.icon} </div>
                  <span>{value.notif}</span>
                </div>
              );
            })}
          </div>
          <div className="box see-more">
            <button>Ver mais</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
