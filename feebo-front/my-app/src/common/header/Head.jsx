import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container d_flex'>
          <div className='left row'>
            <i className='fa fa-phone'></i>
            <label> +351 925 293 132</label>
            <i className='fa fa-envelope'></i>
            <label> feeboo@gmail.com</label>
          </div>
          <div className='right row RText'>
            <label>Contacte-nos!</label>
            <span>🏴</span>
            <label>PT</label>
            <span>🏴</span>
            <label>EURO</label>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
