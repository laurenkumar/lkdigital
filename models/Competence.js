var mongoose = require('mongoose');
var competenceSchema = new mongoose.Schema({
    titre: String,
    competence: String,
    rating: Number,
});

var Competence = mongoose.model('Competence', competenceSchema);

module.exports = Competence;