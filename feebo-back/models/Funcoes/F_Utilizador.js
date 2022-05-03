const monggose = require('mongoose');
const UtilizadorModel = require("../Colecoes/Utilizador");
const ConsumidorModel = require("../Colecoes/Consumidor");
const FornecedorModel = require("../Colecoes/Fornecedor");
const TransportadorModel = require("../Colecoes/Transportador");
const conexao = require('../../conexao');
const bcrypt = require('bcryptjs');











// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);




async function registar (email, nome, dataNasc, nif, morada, telemovel, password, utipo)
{
    await conexao;
    var salt = await bcrypt.genSaltSync(10);
    //console.log(salt)
    var passwordEnc = await bcrypt.hashSync(password, salt);
    // encryptedPassword = await bcrypt.hash(password, 10);
    await UtilizadorModel.create (
        {
            _id: email,
            nome: nome,
            dataNasc: dataNasc,
            nif: nif,
            morada: morada,
            telemovel: telemovel,
            password: passwordEnc,
            utipo: utipo
        }
    )

    if (utipo == "consumidor")
    {
        await ConsumidorModel.create (
            {
                _id: email,
                metodoPagamento: [],
                cesto: [],
                recursosCesto: [],
                poluicaoCesto: 0
            }
        )
    }
    else if (utipo == "fornecedor")
    {
        await FornecedorModel.create (
            {
                _id: email,
                armazens: [],
                produtos: []
            }
        )
    }
    else
    {
        await TransportadorModel.create (
            {
                _id: email, 
                caminhos: [],
                veiculo: null
            }
        )
    }

}

//async function registar (email, nome, dataNasc, nif, morada, telemovel, password, utipo)
registar ("teota@gmail.com", "teota", "12.12.1212", 12345, "Rua26", 765489321, "123", "transportador")

async function login (email, password)
{
    await conexao;
    const utilizador = await UtilizadorModel.findOne({_id: email});
    console.log(await bcrypt.compare(password, utilizador["password"]));

}


async function editarConta (email, morada, telemovel)
{
    await conexao;
    await UtilizadorModel.updateOne(
        {_id: email},
        {
            morada: morada,
            telemovel: telemovel
        }
    )
}
// editarConta("catarina@gmail.com", "Rua", 987654321);


async function alterarPassword (email, passwordAntiga, passwordNova)
{
    await conexao;
    const utilizador = await UtilizadorModel.findOne({_id: email});
    if (await bcrypt.compare(passwordAntiga, utilizador["password"]))
    {
        const salt = await bcrypt.genSalt(10);
        passwordNovaEnc = await bcrypt.hash(passwordNova, salt);
        await UtilizadorModel.updateOne(
            {_id: email},
            {
                password: passwordNovaEnc
            }
        )
        return true
    }
    else
    {
        return false
    }
}

module.exports = {registar, editarConta, editarConta, alterarPassword, login}