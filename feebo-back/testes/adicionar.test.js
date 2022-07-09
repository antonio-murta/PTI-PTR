

const axios = require("axios")


test("Adicionar Produto", async() => {
    const config = {
        "nome": "vassoura",
        "preco": 2.99,
        "cadeia": "cadeiralogistica",
        "recursos": ["madeira", "fibra"],
        "poluicao": 0.87,
        "tipo": "Domestico",
        "subtipo": "Limpeza",
        "quantidade": 54,
        "fornecedor":  "carlota@gmail.com",
        "armazem": "ArmazemA"
    }

    let response = await axios.post("http://localhost:3001/produto", config)

    expect(response.status).toBe(201);
    expect(response.data).toBe("Produto criado com sucesso");
})




test("Adicionar Veiculo", async() => {
    const config = {
        "matricula": "QW-12-RW",
        "marca": "Mercedes",
        "modelo": "Benz",
        "poluicao": 120,
        "utilizacao": "no"
    }

    let response = await axios.post("http://localhost:3001/utilizador/veiculo", config)

    expect(response.status).toBe(200);
    expect(response.data).toBe("Veiculo criado com sucesso");
})



// NAOO DEUU
test("Adicionar Armazem", async() => {
    const config = {
        "nome": "ArmazemA",
        "morada": "Rua Silva de Tomar",
        "poluicao": 1234,
        "telemovel": 915678932,
        "tipo": "Casa",
        "produtos": ["628587155140e5414b62b3e6", 4, "carlota@gmail.com"]
    }

    let response = await axios.post("http://localhost:3001/armazem", config)
    // token_registar = response.data["data"]["auth_token"];
    console.log(response)

    expect(response.status).toBe(200);
    expect(response.data).toBe("Armazem criado com sucesso");
})
