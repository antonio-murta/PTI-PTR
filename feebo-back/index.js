const express = require('express');
const monggose = require('mongoose');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UtilizadorControler = require("./models/Funcoes/F_Utilizador")
const TransporteControler = require("./models/Funcoes/F_Tranporte")
const UtilizadorModel = require("./models/Colecoes/Utilizador");
app.use(express.json());
app.use(cors());

monggose.connect("mongodb+srv://grupo16:123@basedados.rthod.mongodb.net/Loja?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
});

app.get("/", async(req, res) => {
    UtilizadorModel.find({}, (err, result)=> {
        if(err){
            res.send(err);
        }
        res.send(result);
    });
});

// insertUtilizador
app.post("/insert",async (req, res) => {

    const email = req.body.email;
    //const cliente_cartao = req.body.cliente_cartao;
    const nome = req.body.nome;
    const dataNasc = req.body.dataNasc;
    const nif = req.body.nif;
    const morada = req.body.morada;
    const telemovel = req.body.telemovel;
    const password = req.body.password;
    const utipo = req.body.utipo;

    try{
        UtilizadorControler.registar(email, nome, dataNasc, nif, morada, telemovel, password, utipo)
    } catch(err){
        console.log(err);
    }
});


// Login
app.post("/login", async(req, res) => {

    const email = req.body.email
    const password = req.body.password;

    try {
        const result = UtilizadorControler.login(email, password);
        const nome = await UtilizadorModel.findOne({_id: email})["nome"];
        console.log(nome);

        if (result) {
            const token = jwt.sign (
                {email: email, nome},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
        }
    }
    catch (err) {
        console.log(err)
    }
});


// Editar Conta
app.post("/editarConta", async(req, res) => {

    const email = req.body.email;
    const morada = req.body.morada;
    const telemovel = req.body.telemovel;

    try {
        UtilizadorControler.editarConta(email, morada, telemovel)
    }
    catch (err) {
        console.log(err)
    }
});


// alterarPassword
app.post("/alterarPassword",async (req, res) => {

    const email = req.body.email;
    const passwordAntiga = req.body.passwordAntiga;
    const passwordNova = req.body.passwordNova

    try{
        UtilizadorControler.alterarPassword(email, passwordAntiga, passwordNova)
    } catch(err){
        console.log(err);
    }
});

// insertTransportador
app.post("/insertTransporte",async (req, res) => {

    const email = req.body.email;
    const caminhos = req.body.caminhos;
    const veiculo = req.body.veiculo;

    try{
        TransporteControler.criarTransporte(email, caminhos, veiculo)
    } catch(err){
        console.log(err);
    }
});

// insertVeiculo
// app.post("/insert",async (req, res) => {

//     const matricula = req.body.matricula;
//     const marca = req.body.marca;
//     const modelo = req.body.modelo;
//     const poluicao = req.body.poluicao;

//     const veiculo = new VeiculoModel(
//         {_id: matricula,
//         marca: marca,
//         modelo: modelo,
//         poluicao: poluicao
//         }
//     );
    
//     try{
//         await veiculo.save();
//         res.send("inserted data");
//     } catch(err){
//         console.log(err);
//     }
// });

// insertArmazem
// app.post("/insert",async (req, res) => {

//     const nome = req.body.nome;
//     const morada = req.body.morada;
//     const telemovel = req.body.telemovel;

//     const armazem = new ArmazemModel(
//         {
//         nome: nome,
//         morada: morada,
//         telemovel: telemovel,
//         produtos: []
//         }
//     );
    
//     try{
//         await armazem.save();
//         res.send("inserted data");
//     } catch(err){
//         console.log(err);
//     }
// });


// app.get('/',async (req, res) => {



    // const produto = new ProdutoModel(
    //     {
    //     nome: "pedigree para cao",
    //     preco: 5.25,
    //     cadeiaLogistica: "sad",
    //     recursos: "recursos",
    //     poluicao: "poluicao",
    //     tipo: "animais",
    //     subtipo: "cÃ£o",
    //     fornecedor: "catarina@gmail.com",
    //     }
    // );

    // var pagament = ["cartao", 123, "carlota", "02/23", 143]
    // const encomenda = new EncomendaModel(
    //     {
    //     cliente: "carlota@gmail.com",
    //     data_inicio: Date.now(),
    //     produtos: ["cesto"],
    //     transporte: [],
    //     pagamento: pagament
    //     }
    // );

    // try{
        // await utilizador.save();
        // await fornecedor.save();
        // await consumidor.save();
        // await transportador.save();
        // await veiculo.save();
        // await armazem.save();
        // await produto.save();
        // await encomenda.save();

//         res.send("inserted data");
//     } catch(err){
//         console.log(err);
//     }
// });

app.listen(3001, () => {
    console.log('Server running on port 3001...')
});