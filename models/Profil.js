var mongoose = require('mongoose');

var ProfilSchema = new mongoose.Schema({
    pays: String,
    name: String,
    number: Number,
    description: String,
    latitude: String,
    longitude: String,
    picture: String,
    types: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type'
        }
    ]
});

var Profil = mongoose.model('Profil', ProfilSchema);

module.exports = Profil;