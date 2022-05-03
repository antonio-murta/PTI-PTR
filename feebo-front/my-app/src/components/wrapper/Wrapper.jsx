import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      cover: <i class='fa-solid fa-truck-fast'></i>,
      title: "Entregas por Portugal",
      decs: "Entregamos em todos os cantos de Portugal (e nas ilhas)! ",
    },
    {
      cover: <i class='fa-solid fa-id-card'></i>,
      title: "Pagamento seguro",
      decs: "ainda nao sei o que escrever",
    },
    {
      cover: <i class='fa-solid fa-shield'></i>,
      title: "Melhores ofertas",
      decs: "ainda nao sei o que escrever",
    },
    {
      cover: <i class='fa-solid fa-headset'></i>,
      title: "Apoio 24h ",
      decs: "ainda nao sei o que escrever",
    },
  ]
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => {
            return (
              <div className='product' key={index}>
                <div className='img icon-circle'>
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Wrapper
