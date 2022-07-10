// test("lampreia", () => {
//     expect(1+1).toBe(2)
// })

// const produto = require("../models/Colecoes/Produto");
// const transportador = require("../models/Colecoes/Transportador");
// const { login } = require("../models/Funcoes/F_Utilizador");


const axios = require("axios")

// login
// registar
// adicionar e remover produto
// adicionar e remover veiculo
// encomendar cesto
// criar armazem



test("Login", async() => {
    const config = {
        "email": "catarina@gmail.com",
        "password": "123"
    }

    let response = await axios.post("http://localhost:3001/utilizador/login", config)
    // token_login = response.data["data"]["auth_token"];

    const result = response.data.split(";");

    expect(response.status).toBe(200);
    
    expect(result[0]).toBe(config.email);
    expect(typeof result[1]).toBe("string");

})




test("Registar", async() => {
    const random = Math.random().toString(36).substring(2, 15);
    const config = {
        "_id": random + "@gmail.com",
        "nome": "Pedro",
        "password": "123",
        "dataNasc": "1995-12-17T03:24:00",

        "nif": 123456789,
        "telemovel": 9125437938,
        "morada": "Rua S.Francisco",
        "utipo": "fornecedor"
    }

    let response = await axios.post("http://localhost:3001/utilizador", config)

    expect(response.status).toBe(201);
    expect(response.data).toBe("Utilizador criado com sucesso");
})

