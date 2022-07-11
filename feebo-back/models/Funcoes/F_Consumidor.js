const monggose = require("mongoose");
const ConsumidorModel = require("../Colecoes/Consumidor");
const EncomendaModel = require("../Colecoes/Encomenda");
const conexao = require("../../conexao");
const moment = require("moment");

// Encomendas
const get_all_Encomendas = (req, res) => {
  EncomendaModel.find({})
    .then((result) => {
      if (result.length == 0) {
        res.status(400).send("Nao existem encomendas registados");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getById_Encomendas = (req, res) => {
  const id = req.params.id;

  EncomendaModel.findOne({ _id: id })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Encomenda não encontrada");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// VERIFICAR
async function visualizarRecursosCesto(email) {
  await conexao;
  const consumidor = await ConsumidorModel.findOne({ _id: email });
  const recursos = consumidor["recursosCesto"];
  // if recursos tiver vazio retur false
  return recursos;
}

async function visualizarPoluicaoCesto(email) {
  await conexao;
  const consumidor = await ConsumidorModel.findOne({ _id: email });
  const poluicao = consumidor["poluicaoCesto"];
  // if polucao tiver vazio retur false
  return poluicao;
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
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Nao existem consumidores registados");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  const encomendarCesto = (req, res) => {
    // const email = req.params.id;

    // outraData.setDate(time.getDate() + 3);

    EncomendaModel.create({
      // "cliente": req.body.cliente,
      nome: req.body.nome,
      morada: req.body.morada,
      cidade: req.body.cidade,
      distrito: req.body.distrito,
      codigo_postal: req.body.codigo_postal,
      pais: req.body.pais,
      // "produtos": req.body.produtos,
      // "recursos": req.body.recursos,
      // "poluicao": req.body.poluicao,
      pagamento: req.body.pagamento,
      // "data_inicio": new Date()
    }).then(() => {
      res.status(201).send("Encomenda criada com sucesso");
    });
  };

  module.exports = {
    get_all,
    encomendarCesto,
    getById_Encomendas,
    get_all_Encomendas,
  };
};

// const deleteEncomendaById = (req, res) => {
//     const id = req.params.id;

//     EncomendaModel.findOne({ _id: id })
//       .then((result) => {
//         if (result.length == 0) {
//           res.status(404).send("Encomnda nao encontrado");
//         } else {
//           if (result["utilizacao"] == "no") {
//             VeiculoModel.findByIdAndDelete(id)
//             .then(() => {
//               res.status(200).send("veiculo apagado com sucesso");
//             })
//             .catch(() => {
//               res.status(404).send("veiculo nao existe");
//             });
//           }
//         }
//       })
//       .catch((err) => {
//         res.status(400).send(err);
//       });
//   };

const deleteEncomendaById = (req, res) => {
  const id = req.params.id;

  EncomendaModel.deleteOne({ _id: id })
    .then((count) => {
      if (count == 0) {
        res.status(404).send("nao encontrado");
      } else {
        res.status(200).send("Encomenda apagada com sucesso");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  get_all,
  encomendarCesto,
  getById_Encomendas,
  get_all_Encomendas,
  deleteEncomendaById,
};

// VERIFICAR
// async function visualizarRecursosCesto (email)
// {
//     await conexao;
//     const consumidor = await ConsumidorModel.findOne({_id: email});
//     const recursos = consumidor["recursosCesto"]
//     // if recursos tiver vazio retur false
//     return recursos
// }

// async function visualizarPoluicaoCesto (email)
// {
//     await conexao;
//     const consumidor = await ConsumidorModel.findOne({_id: email});
//     const poluicao = consumidor["poluicaoCesto"]
//     // if polucao tiver vazio retur false
//     return poluicao
// }

// async function encomendarCesto (email, emailTransportador, pagamento)

// pagamento = ["cartao", 123, "carlota", "02/23", 143]
// encomendarCesto ("catarina@gmail.com", "Duarte@gmail.com", pagamento)
