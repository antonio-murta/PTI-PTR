const monggose = require("mongoose");
const TransportadorModel = require("../Colecoes/Transportador");
const VeiculoModel = require("../Colecoes/veiculos");
// const conexao = require('../../conexao');

const criarTransportador = (req, res) => {
  const transportador = new TransportadorModel(req.body);
  transportador
    .save()
    .then(() => {
      res.status(201).send("Transportador criado com sucesso");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getByNome = (req, res) => {
  const nome = req.body.nome;

  TransportadorModel.find({ nome: nome })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("nao encontrado");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const criarVeiculo = (req, res) => {
  const veiculo = new VeiculoModel(req.body);
  veiculo
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateVeiculo = (req, res) => {
  const email = req.params.id;
  const veiculo = req.body.matricula;
  TransportadorModel.updateOne(
    { _id: email },
    {
      veiculo: veiculo,
    }
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteByEmail = (req, res) => {
  TransportadorModel.findByIdAndDelete(req.body.email)
    .then(() => {
      res.status(200).send("Utilizador apagado com sucesso");
    })
    .catch(() => {
      res.status(404).send("Utilizador nao existe");
    });
};

module.exports = {
  /*getByNome, updateCaminhos,*/ criarVeiculo,
  updateVeiculo,
  deleteByEmail,
};
