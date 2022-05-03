const monggose = require('mongoose');

const RecursosPoluicaoSchema = new monggose.Schema({
    material: {
        type: String,
        required: true,
    },
    gramagem: {
        type: Number,
        required: true,
    },
    poluicao: {
        type: Number,
        required: true,
    }
});

const recursosPoluicao = monggose.model("recursosPoluicao", RecursosPoluicaoSchema);
module.exports = recursosPoluicao;