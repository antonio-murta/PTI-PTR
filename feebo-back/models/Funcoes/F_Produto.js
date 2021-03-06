const monggose = require('mongoose');
const FornecedorModel = require('../Colecoes/Fornecedor');
const ProdutoModel = require('../Colecoes/Produto');
const conexao = require('../../conexao');

const get_all = (req, res) => {
  ProdutoModel.find({})
    .then((result) => {
      if (result.length == 0) {
        res.status(400).send('Nao existem produto registados');
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

  ProdutoModel.findOne({ _id: id })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// async function getById (id)
// {
//     await conexao;
//     const produto = await ProdutoModel.findOne({_id: id});
//     console.log(produto);
// }

const getByNome = (req, res) => {
  const nome = req.body.nome;

  ProdutoModel.find({ nome: nome })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// async function getByNome (nome)
// {
//     await conexao;
//     const produto = await ProdutoModel.findOne({nome: nome});
//     console.log(produto)
//     // return produto
// }

const getByPreco = (req, res) => {
  const preco = req.body.preco;

  ProdutoModel.find({ preco: preco })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// async function getByPreco (preco)
// {
//     await conexao;
//     const produto = await ProdutoModel.findOne({preco: preco});
//     console.log(produto)
//     // return produto
// }

const getByCadeiaLogistica = (req, res) => {
  const cadeiaLogistica = req.body.cadeiaLogistica;

  ProdutoModel.find({ cadeiaLogistica: cadeiaLogistica })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// async function getByCadeiaLogistica (cadeiaLogistica)
// {
//     await conexao;
//     const produto = await ProdutoModel.findOne({cadeiaLogistica: cadeiaLogistica});
//     console.log(produto)
//     // return produto
// }

const getByRecursos = (req, res) => {
  const recursos = req.body.recursos;

  ProdutoModel.find({ recursos: recursos })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// async function getByRecursos (recursos)
// {
//     await conexao;
//     const produto = await ProdutoModel.findOne({recursos: recursos});
//     // return
//     console.log(produto)
// }

const getByPoluicao = (req, res) => {
  const poluicao = req.body.poluicao;

  ProdutoModel.find({ poluicao: poluicao })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// async function getByPoluicao (poluicao)
// {
//     await conexao;
//     const produto = await ProdutoModel.findOne({poluicao: poluicao});
//     // return produto
//     console.log(produto)
// }

const getByTipo = (req, res) => {
  const tipo = req.body.tipo;

  ProdutoModel.find({ tipo: tipo })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// async function getByTipo (tipo)
// {
//     await conexao;
//     const produtos = await ProdutoModel.find({tipo: tipo});
//     // return produto
//     console.log(produtos)
// }

const getBySubtipo = (req, res) => {
  const subtipo = req.body.subtipo;

  ProdutoModel.find({ subtipo: subtipo })
    .then((result) => {
      if (result.length == 0) {
        res.status(404).send('Produto nao encontrado');
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// async function getBySubtipo (subtipo)
// {
//     await conexao;
//     const produtos = await ProdutoModel.find({subtipo: subtipo});
//     // return produto
//     console.log(produtos)
// }
// ---------------

// adicionar imagens apenas localmente //
// const express = require('express');
// const app = express();
// const multer = require('multer');
// const cors = require('cors');
// const upload = multer({ dest: './imagens/' });
// const fs = require('fs');

// const PORT = 4000;

// app.use(cors());
// app.use(express.static('./imagens'));

// app.post('/uploadFile', upload.single('avatar'), function (req, res) {
//   let fileType = req.file.mimetype.split('/')[1];
//   let newFileName = req.file.filename + '.' + fileType;

//   fs.rename(
//     `./imagens/${req.file.filename}`,
//     `./imagens/${newFileName}`,
//     function () {
//       console.log('callback');
//     }
//   );
// });

// app.listen(PORT, () => console.log('pizza'));
// NAO FIZ -------------------------------------------

async function visualizarProdutosFornecedor(emailFornecedor) {
  await conexao;
  const fornecedor = await FornecedorModel.findOne({ _id: emailFornecedor });
  const produtosID = fornecedor['produtos'];
  const produtos = [];

  for (let i = 0; i < produtosID.length; i++) {
    console.log(produtosID[i]);
    const p = await ProdutoModel.findOne({ _id: produtosID[i] });
    produtos.push(p);
  }
  // console.log(produtos)
  return produtos;
}
// visualizarProdutosFornecedor("catarina@gmail.com")

module.exports = {
  get_all,
  getById,
  getByNome,
  getByCadeiaLogistica,
  getByPoluicao,
  getByPreco,
  getByRecursos,
  getBySubtipo,
  getByTipo,
};
