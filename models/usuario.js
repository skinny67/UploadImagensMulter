const mongoose = require('mongoose');

var UsuarioSchema = mongoose.Schema({
    nome:{type:String},
    email:{type:String},
    senha:{type:String},
    foto:{type:String}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);