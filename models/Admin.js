var mongoose = require('mongoose');
var adminSchema = new mongoose.Schema({
    name: String,
    titre: String,
    accroche: String,
    logo: String,
    background: String
});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;