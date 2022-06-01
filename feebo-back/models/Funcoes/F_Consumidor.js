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
    const email = "catarina@gmail.com";

    ConsumidorModel.findOne({_id: email})
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("nao encontrado");
        } else {

            const cesto = result[0].cesto;
            res.status(200).send(cesto);
        


            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });


}


module.exports = { get_all, encomendarCesto }


// pagamento = ["cartao", 123, "carlota", "02/23", 143]
// encomendarCesto ("catarina@gmail.com", "Duarte@gmail.com", pagamento)