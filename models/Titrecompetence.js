var mongoose = require('mongoose');
var titrecompetenceSchema = new mongoose.Schema({
    titre: String,
});

var Titrecompetence = mongoose.model('Titrecompetence', titrecompetenceSchema);

module.exports = Titrecompetence;