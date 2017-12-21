var mongoose = require('mongoose');
var loisirsSchema = new mongoose.Schema({
    titre: String,
    loisir: String,
});

var Loisirs = mongoose.model('Loisirs', loisirsSchema);

module.exports = Loisirs;