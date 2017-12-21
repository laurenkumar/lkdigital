var mongoose = require('mongoose');
var formationSchema = new mongoose.Schema({
    titre: String,
    lien: String,
    description: String,
    screenshot: String,
});

var Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;