const monggose = require("mongoose");
const ArmazemModel = require("../Colecoes/Armazem");
const FornecedorModel = require("../Colecoes/Fornecedor");
// const conexao = require('../../conexao');
const bcrypt = require("bcryptjs");

const criarArmazem = (req, res) => {
  const armazem = new ArmazemModel(req.body);
  console.log(res);
  armazem
    .save()
    .then(() => {
      res.status(200).send("Armazem criado com sucesso, " + armazem._id);
    })
    .catch((err) => {
      res.status(400).send(err + "Erro ao criar armazem");
    });
};

const updateArmazem = (req, res) => {
  const email = req.params.id;
  // const email = "catarina@gmail.com"

  const idArmazem = req.body._id;
  FornecedorModel.updateOne({ _id: email }, { $push: { armazens: idArmazem } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const get_all_armazens_Fornecedor = (req, res) => {
  const email = req.params.id;
  // const email = "catarina@gmail.com"

  FornecedorModel.findOne({ _id: email })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Nao existem armazens registados");
      } else {
        res.status(200).send(result["armazens"]);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const get_all = (req, res) => {
  ArmazemModel.find({})
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Nao existem armazens registados");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getById = (req, res) => {
  const id = req.params.id;

  ArmazemModel.findOne({ _id: id })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send("Armazem nao encontrado");
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getByNome = (req, res) => {
  const nome = req.body.nome;

  ArmazemModel.find({ nome: nome })
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

const getByMorada = (req, res) => {
  const morada = req.body.morada;

  ArmazemModel.find({ morada: morada })
    .then(() => {
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

const getByTelemovel = (req, res) => {
  const telemovel = req.body.telemovel;

  ArmazemModel.find({ telemovel: telemovel })
    .then(() => {
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

const deleteById = (req, res) => {
  const id = req.params.id;

  ArmazemModel.deleteOne({ _id: id })
    .then((count) => {
      if (count == 0) {
        res.status(404).send("nao encontrado");
      } else {
        res.status(200).send("Armazem apagado com sucesso");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteByNome = (req, res) => {
  const nome = req.params.nome;

  ArmazemModel.deleteMany({ nome: nome })
    .then((count) => {
      if (count == 0) {
        res.status(404).send("nao encontrado");
      } else {
        res.status(200).send("Armazem apagado com sucesso");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  criarArmazem,
  updateArmazem,
  get_all_armazens_Fornecedor,
  getByMorada,
  getByNome,
  getByTelemovel,
  deleteByNome,
  deleteById,
  get_all,
  getById,
};
