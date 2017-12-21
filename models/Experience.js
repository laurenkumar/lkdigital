var mongoose = require('mongoose');
var experienceSchema = new mongoose.Schema({
    titre: String,
    description: String,
    lien: String,
    screenshot: String,
});

var Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;