// <<<<<<< catarina
//   const InfoProdutos = {
//     infoProdutos: [
//       {
//         id: 1,
//         foto: "./images/moda/tshirt.png",
//         name: "T-shirt",
//         preco: "12.99€",
//         poluicao: "0.7kg de CO2",
//         tipo: "Casual",
//         subtipo: "Subtipo",
//       },
//       {
//         id: 2,
//         foto: "./images/moda/vestido.png",
//         name: "Vestido",
//         preco: "22.00€",
//         poluicao: "1kg de CO2",
//         tipo: "Formal",
//         subtipo: "Subtipo",
//       },
//       {
//         id: 3,
//         foto: "./images/moda/sapatos.png",
//         name: "Sapatos",
//         preco: "50.50€",
//         poluicao: "3kg de CO2",
//         tipo: "Calçado",
//         subtipo: "Subtipo",
//       },
//       {
//         id: 4,
//         foto: "./images/moda/casaco.png",
//         name: "Casaco",
//         preco: "20.99€",
//         poluicao: "2kg de CO2",
//         tipo: "Outdoor",
//         subtipo: "Subtipo",
//       },
//       {
//         id: 5,
//         foto: "./images/moda/camisa.png",
//         name: "Camisa",
//         preco: "15.99€",
//         poluicao: "1.5kg de CO2",
//         tipo: "Formal",
//         subtipo: "Subtipo",
//       },
//     ],
//   };
//   export default InfoProdutos;

// import React, {useEffect} from 'react'
// console.log("aaa")

// const InfoProdutos = () => {

//   const infoProdutos = [];

//   useEffect(() => {
//     fetch(
//       "http://localhost:3001/produto/",
//       { method: "GET" }
//     )
//       .then(
//         // (response) => response.text())

//       (response) => {
//         console.log("ddd", response);
//       })
//       .then((texto) => {
//         texto = JSON.parse(texto);

//         for (let i = 0; i < texto.length; i++) {
//           infoProdutos.push(
//             {
//               cadeiaLogistica: texto[i]["cadeia"],
//               fornecedorId: texto[i]["fornecedor"],
//               nome: texto[i]["nome"],
//               poluicao: texto[i]["poluicao"],
//               preco: texto[i]["preco"],
//               quantidade: texto[i]["quantidade"],
//               recursos: texto[i]["recursos"],
//               subtipo: texto[i]["subtipo"],
//               tipo: texto[i]["tipo"]
//             }
//           );

//         }

//       })
//       .catch((err) => console.log(err.message));
//   }, [])
// }

// export default InfoProdutos
// =======


const InfoProdutos = {
  infoProdutos: [
    {
      id: 1,
      foto: './images/moda/tshirt.png',
      name: 'T-shirt',
      preco: '12.99€',
      poluicao: '0.7kg de CO2',
      tipo: 'Casual',
      subtipo: 'Subtipo',
    },
    {
      id: 2,
      foto: './images/moda/vestido.png',
      name: 'Vestido',
      preco: '22.00€',
      poluicao: '1kg de CO2',
      tipo: 'Formal',
      subtipo: 'Subtipo',
    },
    {
      id: 3,
      foto: './images/moda/sapatos.png',
      name: 'Sapatos',
      preco: '50.50€',
      poluicao: '3kg de CO2',
      tipo: 'Calçado',
      subtipo: 'Subtipo',
    },
    {
      id: 4,
      foto: './images/moda/casaco.png',
      name: 'Casaco',
      preco: '20.99€',
      poluicao: '2kg de CO2',
      tipo: 'Outdoor',
      subtipo: 'Subtipo',
    },
    {
      id: 5,
      foto: './images/moda/camisa.png',
      name: 'Camisa',
      preco: '15.99€',
      poluicao: '1.5kg de CO2',
      tipo: 'Formal',
      subtipo: 'Subtipo',
    },
  ],
};
export default InfoProdutos;
// // >>>>>>> main




// import React, {useEffect} from 'react'

// const InfoProdutos = () => {

//   const infoProdutos = [];
//   alert("111")
//   console.log("1")

//   useEffect(() => {
//     fetch(
//       "http://localhost:3001/produto/",
//       { method: "GET" }
//     )
//       .then((response) => {
//         response.text()
//         console.log("2")
//       })
//       .then((texto) => {
//         console.log("3")
//         texto = JSON.parse(texto);
  
//         for (let i = 0; i < texto.length; i++) {
//           // var dict = {};
//           // dict['cadeiaLogistica'] = texto[i]["cadeiaLogistica"];
//           // dict['fornecedorId'] = texto[i]["fornecedorId"];
//           // dict['nome'] = texto[i]["nome"];
//           // dict['poluicao'] = texto[i]["poluicao"];
//           // dict['preco'] = texto[i]["preco"];
//           // dict['quantidade'] = texto[i]["quantidade"];
//           // dict['recursos'] = texto[i]["recursos"];
//           // dict['subtipo'] = texto[i]["subtipo"];
//           // dict['tipo'] = texto[i]["tipo"];

//           infoProdutos.push({id: {i},
//                    foto: "ola",
//                    name: "T-shirt",
//                    preco: "12.99€",
//                    poluicao: "0.7kg de CO2",
//                    tipo: "Casual",
//                    subtipo: "Subtipo"});
//           console.log(InfoProdutos)
  
//         }
        
//       })
//       .catch((err) => console.log(err.message));
//   }, [])
// }

// export default InfoProdutos


