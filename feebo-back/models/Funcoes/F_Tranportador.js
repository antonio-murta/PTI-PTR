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
      res.status(200).send("Veiculo criado com sucesso," + veiculo._id);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const updateVeiculo = (req, res) => {
  const email = req.params.id;
  const veiculo = req.body._id;
  TransportadorModel.updateOne({ _id: email }, { $push: { veiculos: veiculo } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const get_all_veiculos_Transportador = (req, res) => {
  const email = req.params.id;
  TransportadorModel.findOne({ _id: email })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Nao existem veiculos registados");
      } else {
        res.status(200).send(result["veiculos"]);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const get_all_veiculos = (req, res) => {
  VeiculoModel.find({})
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Nao existem veiculos registados");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getById_veiculos = (req, res) => {
  const id = req.params.id;
  console.log(id);

  VeiculoModel.findOne({ _id: id })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("veiculo nao encontrado");
      } else {
        res.status(200).send(result);
      }
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

const deleteVeiculoById = (req, res) => {
  const id = req.params.id;

  VeiculoModel.findOne({ _id: id })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Veiculo nao encontrado");
      } else {
        if (result["utilizacao"] == "no") {
          VeiculoModel.findByIdAndDelete(id)
            .then(() => {
              res.status(200).send("veiculo apagado com sucesso");
            })
            .catch(() => {
              res.status(404).send("veiculo nao existe");
            });
        }
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  /*getByNome, updateCaminhos,*/ criarVeiculo,
  updateVeiculo,
  get_all_veiculos,
  deleteByEmail,
  deleteVeiculoById,
  get_all_veiculos_Transportador,
  getById_veiculos,
};
