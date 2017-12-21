var mongoose = require('mongoose');
var infosSchema = new mongoose.Schema({
    description: String,
    picture: String,
    age: String,
    permis: String,
    ville: String,
    email: String,
    skype: String,
    linkedin: String,
    situation: String,
    recherche: String,
    facebook: String,
    twiter: String,
    linkedin: String
});

var Infos = mongoose.model('Infos', infosSchema);

module.exports = Infos;