const monggose = require('mongoose');
const TransporteModel = require("../Colecoes/Transporte");
const ArmazemModel = require("../Colecoes/Armazem");
const EncomendaModel = require("../Colecoes/Encomenda");
// const conexao = require('../../conexao');




const obterIDsProdutosArmazem = (req, res) => {
    const lista_prodArmazens = [];
    ArmazemModel.find({})
        .then(result => {
            result.forEach(function (valueR, iR) {
            
                const prods = result[iR]["produtos"];
                
                prods.forEach(function (valueA, iA) {
                    const l = [];
                    l.push(valueA)
                    l.push(result[0]["morada"])
                    
                    const prods = valueA;
                    lista_prodArmazens.push(l)
                })
            })

            res.status(404).send(lista_prodArmazens);
        })
        .catch(err => {
            res.status(400).send(err);
        });
}

const obterIDsProdutosEncomenda = (req, res) => {
    const lista_prodEncomendas = [];
    // const emailTransportador = "Duarte@gmail.com"
    // const lista_encomendas = ["624f0052a0b7a1a1bb7b9001", "624f0052a0b7a1a1bb7b9001"]
    const lista_encomendas = "624f0052a0b7a1a1bb7b9001";
    
    // const emailTransportador = req.params.id;
    // const lista_encomendas = req.body.encomendas;

    // Percorrer a lista de encomendas
    // lista_encomendas.forEach(function (valueA, iA) {
        // const lista = [];
        let encomenda = EncomendaModel.findById(lista_encomendas)
        .then(result => {
            // Percorrer a lista dos produtos da encomenda
            result["produtos"].forEach(function (valueP, iP) {
                lista_prodEncomendas.push(valueP[0])
            })
            res.status(404).send(lista_prodEncomendas);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    // })
}

const verificarMorada = (req, res) => {
    // const list_pEncomenda = req.body.p_encomenda;
    // const list_pArmazem = req.body.p_armazem;
    const lista  = [];
    const list_pEncomenda = [
        "628587155140e5414b62b3e6",
        "6298e96b678cf7b60bdaac44"
    ];

    const list_pArmazem = [[
        "6298e96b678cf7b60bdaac44",
        "doce 3"
    ],
    [
        "628587155140e5414b62b3e6",
        "doce 3"
    ]];

    list_pEncomenda.forEach(function (valueE, iE) {
        list_pArmazem.forEach(function (valueA, iA) {
            if (valueE == valueA[0])
            {
                lista.push(valueA[1])
            }
        })
    })


    let lista_final = lista.filter((item,index)=>{
        return lista.indexOf(item) === index;
    })
    console.log(lista_final);
    res.status(404).send(lista_final);




    
}








module.exports = {obterIDsProdutosEncomenda, obterIDsProdutosArmazem, verificarMorada};