// test("lampreia", () => {
//     expect(1+1).toBe(2)
// })

// const produto = require("../models/Colecoes/Produto");
// const transportador = require("../models/Colecoes/Transportador");
// const { login } = require("../models/Funcoes/F_Utilizador");

// login
// registar
// adicionar e remover produto
// adicionar e remover veiculo
// encomendar cesto
// criar armazem



var token_login = "";
test("Login", async() => {
    const config = {
        "email": "catarina@gmail.com",
        "password": "123"
    }
    let response = await Axios.post("http://localhost:3001/utilizador/login", config)
    token_login = response.data["data"]["auth_token"];

    expect(response.data["code"]).toBe(200);
    expect(response.data["message"]).toBe("Sucess");
    expect(typeof response.data["data"]["auth_token"]).toBe("string");
})



var token_registar = "";
test("Registar", async() => {
    const config = {
        "_id": "edro@gmail.com",
        "nome": "Pedro",
        "password": "123",
        "dataNasc": "23-12-2010",
        "nif": 123456789,
        "telemovel": 9125437938,
        "morada": "Rua S.Francisco",
        "utipo": "fornecedor"
    }

    let response = await axios.post("http://localhost:8080/utilizador", config)
    token_registar = response.data["data"]["auth_token"];

    expect(response.data["code"]).toBe(200);
    expect(response.data["message"]).toBe("Sucess");
    expect(typeof response.data["data"]["auth_token"]).toBe("string");
})




