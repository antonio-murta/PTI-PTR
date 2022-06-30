const monggose = require('mongoose');
const ConsumidorModel = require("../Colecoes/Consumidor");
const EncomendaModel = require("../Colecoes/Encomenda");
const conexao = require('../../conexao');
const moment = require("moment");



// VERIFICAR
async function visualizarRecursosCesto (email)
{
    await conexao;
    const consumidor = await ConsumidorModel.findOne({_id: email});
    const recursos = consumidor["recursosCesto"]
    // if recursos tiver vazio retur false
    return recursos
}


async function visualizarPoluicaoCesto (email)
{
    await conexao;
    const consumidor = await ConsumidorModel.findOne({_id: email});
    const poluicao = consumidor["poluicaoCesto"]
    // if polucao tiver vazio retur false
    return poluicao
}



// async function encomendarCesto (email, emailTransportador, pagamento)
// {
//     now = new Date;
//     await conexao;
//     const Utilizador = await ConsumidorModel.findOne({_id: email});
//     const produtos = Utilizador["cesto"];

//     // let data = moment().format();


//     const data = now.getDate() + "." + now.getMonth() + "." + now.getFullYear()

//     await EncomendaModel.create (
//         {
//             cliente:  email,
//             data_inicio:  data,
//             produtos: produtos,
//             transporte: emailTransportador,
//             pagamento:  pagamento
//         }
//     )
// }

const get_all = (req, res) => {
    ConsumidorModel.find({})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("Nao existem consumidores registados");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    })
}



const encomendarCesto = (req, res) => {
    // const email = req.params.id;

    // outraData.setDate(time.getDate() + 3);

    EncomendaModel.create(
        {
            "cliente": req.body.cliente,
            "nome_completo": req.body.nome_completo,
            "rua": req.body.rua,
            "cidade": req.body.cidade,
            "distrito": req.body.distrito,
            "codigo_postal": req.body.codigo_postal,
            "pais": req.body.pais,
            "produtos": req.body.produtos,
            "recursos": req.body.recursos,
            "poluicao": req.body.poluicao,
            "pagamento": req.body.pagamento,
            "data_inicio": new Date()
        }
    )
    .then(() => {
        res.status(201).send("Encomenda criada com sucesso");
    });

}


module.exports = { get_all, encomendarCesto }


// pagamento = ["cartao", 123, "carlota", "02/23", 143]
// encomendarCesto ("catarina@gmail.com", "Duarte@gmail.com", pagamento)