import React from "react";
import { RiTruckFill } from "react-icons/ri";
import "./style-transporte.css";

const Notifications = () => {
  const data = [
    {
      notif: "Veículo A saiu do Armazém 1",
      icon: <RiTruckFill />,
      time: "5m",
    },
    {
      notif: "Veículo B chegou ao Armazém 2",
      icon: <RiTruckFill />,
      time: "24m",
    },
    {
      notif: "Veículo C chegou ao Armazém 3",
      icon: <RiTruckFill />,
      time: "2h",
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
