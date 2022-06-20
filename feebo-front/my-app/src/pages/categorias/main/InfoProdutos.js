  const InfoProdutos = {
    infoProdutos: [
      {
        id: 1,
        foto: "./images/moda/tshirt.png",
        name: "T-shirt",
        preco: "12.99€",
        poluicao: "0.7kg de CO2",
        tipo: "Casual",
        subtipo: "Subtipo",
      },
      {
        id: 2,
        foto: "./images/moda/vestido.png",
        name: "Vestido",
        preco: "22.00€",
        poluicao: "1kg de CO2",
        tipo: "Formal",
        subtipo: "Subtipo",
      },
      {
        id: 3,
        foto: "./images/moda/sapatos.png",
        name: "Sapatos",
        preco: "50.50€",
        poluicao: "3kg de CO2",
        tipo: "Calçado",
        subtipo: "Subtipo",
      },
      {
        id: 4,
        foto: "./images/moda/casaco.png",
        name: "Casaco",
        preco: "20.99€",
        poluicao: "2kg de CO2",
        tipo: "Outdoor",
        subtipo: "Subtipo",
      },
      {
        id: 5,
        foto: "./images/moda/camisa.png",
        name: "Camisa",
        preco: "15.99€",
        poluicao: "1.5kg de CO2",
        tipo: "Formal",
        subtipo: "Subtipo",
      },
    ],
  };
  export default InfoProdutos;



// import React, {useEffect} from 'react'

// const InfoProdutos = () => {

//   const infoProdutos = [];

//   useEffect(() => {
//     fetch(
//       "http://localhost:3001/produto/",
//       { method: "GET" }
//     )
//       .then((response) => response.text())
//       .then((texto) => {
//         texto = JSON.parse(texto);
  
//         for (let i = 0; i < texto.length; i++) {
//           infoProdutos.push(
//             {
//               cadeiaLogistica: texto[i]["cadeiaLogistica"],
//               fornecedorId: texto[i]["fornecedorId"],
//               nome: texto[i]["nome"],
//               poluicao: texto[i]["poluicao"],
//               preco: texto[i]["preco"],
//               quantidade: texto[i]["quantidade"],
//               recursos: texto[i]["recursos"],
//               subtipo: texto[i]["subtipo"],
//               tipo: texto[i]["tipo"]
//             }
//           );
//           console.log(InfoProdutos)
  
//         }
        
//       })
//       .catch((err) => console.log(err.message));
//   }, [])
// }

// export default InfoProdutos