const monggose = require('mongoose');
const UtilizadorModel = require("../Colecoes/Utilizador");
const ConsumidorModel = require("../Colecoes/Consumidor");
const FornecedorModel = require("../Colecoes/Fornecedor");
const TransportadorModel = require("../Colecoes/Transportador");
//const conexao = require('../../conexao');
const bcrypt = require('bcryptjs');




const registar = (req, res) => {
    let utipo = req.body.utipo;
    var salt = bcrypt.genSaltSync(10);
    //console.log(salt)
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const utilizador = new UtilizadorModel(req.body);
    utilizador.save()
    .then(() => {
        if (utipo == "consumidor") {
            ConsumidorModel.create(
                {
                    _id: email,
                    metodoPagamento: [],
                    cesto: [],
                    recursosCesto: [],
                    poluicaoCesto: 0
                }
            )
            .then(() => {
                res.status(201).send("Utilizador criado com sucesso");
            });
        }
        else if (utipo == "fornecedor") {
            FornecedorModel.create(
                {
                    _id: email,
                    armazens: []
                }
            )
            .then(() => {
                res.status(201).send("Utilizador criado com sucesso");
            });
        }
        else {
            TransportadorModel.create(
                {
                    _id: email,
                    caminhos: [],
                    veiculo: []
                }
            )
            .then(() => {
                res.status(201).send("Utilizador criado com sucesso");
            });
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let utilizador = UtilizadorModel.findOne({_id: email});
    let result = bcrypt.compare(password, utilizador["password"]).valueOf();
    if (result) {
        res.status(200).send("login feito com sucesso");
    } else {
        res.status(400).send("email/password invalidos");
    }
}

const editarConta = (req, res) => {
    const email = req.params.id;
    UtilizadorModel.updateOne(
        { _id: email },
        {
            morada: req.body.morada,
            telemovel: req.body.telemovel
        }
    )
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(400).send(err);
    });
}

const alterarPassword = (req, res) => {
    const email = req.params.id;
    const utilizador = UtilizadorModel.findOne({ _id: email });
    if (bcrypt.compare(req.body.passwordAntiga, utilizador["password"])) {
        const salt = bcrypt.genSalt(10);
        passwordNovaEnc = bcrypt.hash(req.body.passwordNova, salt);
        UtilizadorModel.updateOne(
            { _id: email },
            {
                password: passwordNovaEnc
            }
        )
        .then(() => {
            res.status(200).send("Password alterada com sucesso");
        })
    }
    else {
        res.status(400).send("Password antiga nao corresponde com a dada");
    }
}

const apagarUtilizadores = (req, res) => {
    UtilizadorModel.deleteMany({})
    .then(result => {
        res.status(200).send("Utilizadores apagados com sucesso");
    })
    .catch(err => {
        res.status(400).send(err);
    })
}


const apagarUtilizadores_byID = (req, res) => {
    UtilizadorModel.findByIdAndDelete(req.body.email)
    .then(() => {
        res.status(200).send("Utilizador apagado com sucesso");
    })
    .catch(() => {
        res.status(404).send("Utilizador nao existe");
    })
}



// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);




// async function registar(email, nome, dataNasc, nif, morada, telemovel, password, utipo) {
//     await conexao;
//     var salt = await bcrypt.genSaltSync(10);
//     //console.log(salt)
//     var passwordEnc = await bcrypt.hashSync(password, salt);
//     // encryptedPassword = await bcrypt.hash(password, 10);
//     await UtilizadorModel.create(
//         {
//             _id: email,
//             nome: nome,
//             dataNasc: dataNasc,
//             nif: nif,
//             morada: morada,
//             telemovel: telemovel,
//             password: passwordEnc,
//             utipo: utipo
//         }
//     )
//         .then(() => {
//             if (utipo == "consumidor") {
//                 ConsumidorModel.create(
//                     {
//                         _id: email,
//                         metodoPagamento: [],
//                         cesto: [],
//                         recursosCesto: [],
//                         poluicaoCesto: 0
//                     }
//                 )
//                     .then(() => {
//                         return true;
//                     })
//                     .catch(err => {
//                         return err;
//                     });
//             }
//             else if (utipo == "fornecedor") {
//                 FornecedorModel.create(
//                     {
//                         _id: email,
//                         armazens: [],
//                         produtos: []
//                     }
//                 )
//                 .then(() => {
//                     return true;
//                 })
//                 .catch(err => {
//                     return err;
//                 });
//             }
//             else {
//                 TransportadorModel.create(
//                     {
//                         _id: email,
//                         caminhos: [],
//                         veiculo: null
//                     }
//                 )
//                 .then(() => {
//                     return true;
//                 })
//                 .catch(err => {
//                     return err;
//                 });
//             }
//         })
//         .catch(err => {
//             return err;
//         })



// }

// //async function registar (email, nome, dataNasc, nif, morada, telemovel, password, utipo)
// //registar ("teota@gmail.com", "teota", "12.12.1212", 12345, "Rua26", 765489321, "123", "transportador")

// async function login(email, password) {
//     await conexao;
//     const utilizador = await UtilizadorModel.findOne({ _id: email });
//     return await bcrypt.compare(password, utilizador["password"]).valueOf();

// }


// async function editarConta(email, morada, telemovel) {
//     await conexao;
//     await UtilizadorModel.updateOne(
//         { _id: email },
//         {
//             morada: morada,
//             telemovel: telemovel
//         }
//     )
// }
// // editarConta("catarina@gmail.com", "Rua", 987654321);


// async function alterarPassword(email, passwordAntiga, passwordNova) {
//     await conexao;
//     const utilizador = await UtilizadorModel.findOne({ _id: email });
//     if (await bcrypt.compare(passwordAntiga, utilizador["password"])) {
//         const salt = await bcrypt.genSalt(10);
//         passwordNovaEnc = await bcrypt.hash(passwordNova, salt);
//         await UtilizadorModel.updateOne(
//             { _id: email },
//             {
//                 password: passwordNovaEnc
//             }
//         )
//         return true
//     }
//     else {
//         return false
//     }
// }

// async function apagarUtilizadores(email = "") {
//     await conexao;
//     if (email != "") {
//         await UtilizadorModel.findByIdAndDelete(email)
//             .then(() => {
//                 return true;
//             })
//             .catch(err => {
//                 return err;
//             });
//     } else {
//         await UtilizadorModel.deleteMany({})
//             .then(() => {
//                 return true;
//             })
//             .catch(err => {
//                 return err;
//             })
//     }

// }

module.exports = { registar, editarConta, editarConta, alterarPassword, login, apagarUtilizadores, apagarUtilizadores_byID }