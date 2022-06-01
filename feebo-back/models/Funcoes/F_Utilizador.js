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
    let password = req.body.passwordEscrita;
    console.log("editaperfil");

    let utilizador = UtilizadorModel.findById(email, function(err, result){
        console.log(result["password"]);
        console.log("qq");
        let match =  bcrypt.compare(password, result["password"]);
        match.then(function(result) {
            if (result) {
                console.log("qq");
                UtilizadorModel.updateOne(
                    { _id: email },
                    {
                        nome: req.body.nome,
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
            else {
                res.status(200).send("Password incorreta");
            }
        })
    });
}

const alterarPassword = (req, res) => {
    const email = req.params.id;
    let passwordAtual = req.body.passwordAtual;
    let passwordNova = req.body.passwordNova;
    let passwordConf = req.body.passwordConf;
    

    let utilizador = UtilizadorModel.findById(email, function(err, result){
        let match =  bcrypt.compare(passwordAtual, result["password"]);
        match.then(function(result) {
            if (result) {
                // if (passwordNova == passwordConf) {
                //     var salt = bcrypt.genSaltSync(10);
                //     let pass = bcrypt.hashSync(passwordNova, salt);
                //     UtilizadorModel.updateOne(
                //         { _id: email },
                //         {
                //             password: pass
                //         }
                //         )
                //         .then(result => {
                //             res.status(200).send(result);
                //         })
                //         .catch(err => {
                //             res.status(400).send(err);
                //         });
                // }
                // else {
                //     console.log("diferentes");
                //     res.status(400).send("Passwords nao coincidem");
                // }  
            }
            else {
                res.status(400).send("Password não corresponde");
            }
        })
    });
}


const apagarConta = (req, res) => {
    const email = req.params.id;
    let password = req.body.password;

    let utilizador = UtilizadorModel.findById(email, function(err, result){
        let match =  bcrypt.compare(password, result["password"]);
        match.then(function(result) {
            if (result) {
                UtilizadorModel.findByIdAndDelete(email)
                .then(() => {
                    res.status(200).send("Utilizador apagado com sucesso");
                })
                .catch(() => {
                    res.status(404).send("Utilizador nao existe");
                })
            }
            else {
                res.status(400).send("Password não corresponde");
            }
        })
    });







   
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






const getByDados = (req, res) => {
    const email = req.params.id;
    const utilizador = UtilizadorModel.findOne({ _id: email })
    .then(result => {
        if (result.length == 0) {
            res.status(404).send("nao encontrado");
        } else {
            res.status(200).send(result);
        }
    })
    .catch(err => {
        res.status(400).send(err);
    });

}





module.exports = { registar, editarConta, editarConta, alterarPassword, login, apagarUtilizadores, apagarUtilizadores_byID, getByDados, apagarConta }