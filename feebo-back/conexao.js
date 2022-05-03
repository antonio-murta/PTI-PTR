const monggose = require('mongoose');

monggose.connect("mongodb+srv://grupo16:123@basedados.rthod.mongodb.net/Loja?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
});