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



async function encomendarCesto (email, emailTransportador, pagamento)
{
    now = new Date;
    await conexao;
    const Utilizador = await ConsumidorModel.findOne({_id: email});
    const produtos = Utilizador["cesto"];

    // let data = moment().format();


    const data = now.getDate() + "." + now.getMonth() + "." + now.getFullYear()

    await EncomendaModel.create (
        {
            cliente:  email,
            data_inicio:  data,
            produtos: produtos,
            transporte: emailTransportador,
            pagamento:  pagamento
        }
    )
}
// pagamento = ["cartao", 123, "carlota", "02/23", 143]
// encomendarCesto ("catarina@gmail.com", "Duarte@gmail.com", pagamento)