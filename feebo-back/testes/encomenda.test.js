

const axios = require("axios")

test("Encomendar", async() => {
    const config = {
        "cliente": "catarina@gmail.com",
        "nome_completo": "Catarina Travanca",
        "rua": "Rua Cassiano Branco",
        "cidade": "Lisboa",
        "distrito": "Lisboa",
        "codigo_postal": 1950001,
        "pais": "Portugal",
        "produtos": [["628587155140e5414b62b3e6", 4], ["6298e96b678cf7b60bdaac44", 2]],

        "recursos": ["natureza", "borracha", "plastico", "corda"],

        "poluicao": 18,
        "pagamento": 2.4,
        "data_inicio": new Date()
    }

    let response = await axios.put("http://localhost:3001/consumidor/encomenda", config)

    expect(response.status).toBe(201);
    expect(response.data).toBe("Encomenda criada com sucesso");

})