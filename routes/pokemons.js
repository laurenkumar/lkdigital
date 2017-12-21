var router = require('express').Router();

var Pokemon = require('./../models/Profil');
var Infos = require('./../models/Infos');
var Experience = require('./../models/Experience');
var Formation = require('./../models/Formation');
var Competence = require('./../models/Competence');
var Loisirs = require('./../models/Loisirs');
var Titrecompetence = require('./../models/Titrecompetence');
var Admin = require('./../models/Admin');
var nodemailer = require('./../node_modules/nodemailer');



var smtpTransport = nodemailer.createTransport("SMTP", {

    service: 'Gmail',
    host: "smtp.gmail.com",
    auth: {
        // enter your gmail account
        user: 'dododream7780@gmail.com',
        // enter your gmail password
        pass: 'r6tvy654'
    }
});

router.get('/send', function (req, res) {

    var mailOptions = {
        to: "dododream7780@gmail.com",
        subject: 'Contact Form Message',
        from: "Contact Form Request" + "<" + req.query.from + '>',
        html:  "From: " + req.query.name + "<br>" +
               "User's email: " + req.query.user + "<br>" +     "Message: " + req.query.text
    }

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log(err);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });

});

router.get('/', (req, res) => {
    Loisirs.find({}).then(loisirs => {
        Titrecompetence.find({}).then(titrecompetence => {
            Competence.find({}).then(competence => {
                Formation.find({}).then(formation => {
                    Experience.find({}).then(experiences => {
                        Admin.find({}).limit(1).then(admins => {
                            Infos.find({}).limit(1).then(infos => {
                                Pokemon.find({}).then(pokemons => {
                                    if (req.session.passport) {
                                        res.render('pokemons/index.html', { admins: admins, loisirs: loisirs, experiences: experiences, titrecompetence:titrecompetence, formation:formation, competence:competence, pokemons: pokemons,  infos: infos, user: req.session.passport.user });
                                    } else {
                                       res.render('pokemons/index.html', { admins: admins, loisirs: loisirs, experiences: experiences, titrecompetence:titrecompetence, formation:formation, competence:competence, pokemons: pokemons,  infos: infos});
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

router.get('/experiences', (req, res) => {
    Experience.find({}).then(experiences => {
        Admin.find({}).limit(1).then(admins => {
            Infos.find({}).limit(1).then(infos => {
                Pokemon.find({}).then(pokemons => {
                    if (req.session.passport) {
                        res.render('pokemons/experiences.html', { admins: admins, pokemons: pokemons, experiences:experiences, infos: infos, user: req.session.passport.user });
                    } else {
                       res.render('pokemons/experiences.html', { admins: admins, pokemons: pokemons, experiences:experiences, infos: infos});
                    }
                });
            });
        });
    });
});

router.get('/loisirs', (req, res) => {
    Loisirs.find({}).then(loisirs => {
        Admin.find({}).limit(1).then(admins => {
            Infos.find({}).limit(1).then(infos => {
                Pokemon.find({}).then(pokemons => {
                    if (req.session.passport) {
                        res.render('pokemons/loisirs.html', { admins: admins, pokemons: pokemons, loisirs:loisirs, infos: infos, user: req.session.passport.user });
                    } else {
                       res.render('pokemons/loisirs.html', { admins: admins, pokemons: pokemons, loisirs:loisirs, infos: infos});
                    }
                });
            });
        });
    });
});

router.get('/competence', (req, res) => {
    Titrecompetence.find({}).then(titrecompetence => {
        Competence.find({}).then(competence => {
            Admin.find({}).limit(1).then(admins => {
                Infos.find({}).limit(1).then(infos => {
                    Pokemon.find({}).then(pokemons => {
                        if (req.session.passport) {
                            res.render('pokemons/competence.html', { admins: admins, pokemons: pokemons, competence:competence, titrecompetence:titrecompetence, infos: infos, user: req.session.passport.user });
                        } else {
                           res.render('pokemons/competence.html', { admins: admins, pokemons: pokemons, competence:competence, titrecompetence:titrecompetence, infos: infos});
                        }
                    });
                });
            });
        });
    });
});

router.get('/formation', (req, res) => {
    Formation.find({}).then(formation => {
        Admin.find({}).limit(1).then(admins => {
            Infos.find({}).limit(1).then(infos => {
                Pokemon.find({}).then(pokemons => {
                    if (req.session.passport) {
                        res.render('pokemons/formations.html', { admins: admins, pokemons: pokemons, formation:formation, infos: infos, user: req.session.passport.user });
                    } else {
                       res.render('pokemons/formations.html', { admins: admins, pokemons: pokemons, formation:formation, infos: infos});
                    }
                });
            });
        });
    });
});

router.get('/new', (req, res) => {
    Type.find({}).then(types => {
        var pokemon = new Pokemon();
        if (req.session.passport) {
            res.render('pokemons/edit.html', { pokemon: pokemon, types: types, endpoint: '/', user: req.session.passport.user });
        } else {
           res.render('pokemons/index.html', { admins: admins, pokemons: pokemons});
        }
    })
});


router.get('/admin', (req, res) => {
        var admin = new Admin();
        Titrecompetence.find({}).then(titrecompetence => {
            Pokemon.find({}).then(pokemons => {
                if (req.session.passport) {
                    res.render('pokemons/admin.html', {admin: admin, endpoint: '/admin', titrecompetence:titrecompetence, pokemons: pokemons, user: req.session.passport.user });
                } else {
                   res.render('pokemons/index.html', { admins: admins, titrecompetence:titrecompetence, pokemons: pokemons });
                }
            });
        });
});

router.get('/travel', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Country.find({}).then(country => {
            if (req.session.passport) {
                res.render('pokemons/travel.html', { admins: admins, country: country, user: req.session.passport.user });
            } else {
               res.render('pokemons/travel.html', { admins: admins, country: country});
            }
        });
    });
});

router.get('/map', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Pokemon.find({}).then(pokemons => {
            var query = Pokemon.where({ pays: req.query.country });
            query.findOne(function (err, Pokemon) {
                if (!Pokemon) {
                    if (req.session.passport) {
                        res.render('pokemons/one_day.html', { admins: admins, user: req.session.passport.user });
                    } else {
                        res.render('pokemons/one_day.html', { admins: admins});
                    }              
                }
                else {
                    if (req.session.passport) {
                        res.render('pokemons/map.html', { admins: admins, pokemons: pokemons, user: req.session.passport.user, country: req.query.country });
                    } else {
                        res.render('pokemons/map.html', { admins: admins, pokemons: pokemons, country: req.query.country});
                    }
                }
            });
        });
    });
});

router.get('/presentation', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        if (req.session.passport) {
            res.render('pokemons/presentation.html', { user: req.session.passport.user });
        } else {
           res.render('pokemons/presentation.html', { admins: admins});
        }
    });
});

router.get('/contact', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        if (req.session.passport) {
            res.render('pokemons/contact.html', { user: req.session.passport.user });
        } else {
           res.render('pokemons/contact.html', { admins: admins});
        }
    });
});

router.get('/photos', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Photos.find({}).then(photos => {
            if (req.session.passport) {
                res.render('pokemons/photos.html', { photos: photos, user: req.session.passport.user });
            } else {
               res.render('pokemons/photos.html', { photos: photos, admins: admins});
            }
        });
    });
});

router.get('/edit/experience/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Infos.find({}).limit(1).then(infos => {
            Pokemon.find({}).then(pokemons => {
                Experience.findById(req.params.id).then(experiences => {
                    Admin.find({}).limit(1).then(admins => {
                        Infos.find({}).limit(1).then(infos => {
                            if (req.session.passport) {
                                res.render('pokemons/edit_experience.html', { pokemon: pokemon , admins: admins, infos:infos, experiences: experiences, user: req.session.passport.user , endpoint: '/' + experiences._id.toString() });
                            } else {
                               res.render('pokemons/index.html', { admins: admins, infos:infos, experiences: experiences, pokemons: pokemons, endpoint: '/' + experiences._id.toString()});
                            }
                        });
                    });
                });
            });
        });
    });
});

router.get('/edit/formation/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Infos.find({}).limit(1).then(infos => {
            Pokemon.find({}).then(pokemons => {
                Formation.findById(req.params.id).then(formations => {
                    Admin.find({}).limit(1).then(admins => {
                        Infos.find({}).limit(1).then(infos => {
                            if (req.session.passport) {
                                res.render('pokemons/edit_formation.html', { pokemon: pokemon , admins: admins, infos:infos, formations: formations, user: req.session.passport.user , endpoint: '/' + formations._id.toString() });
                            } else {
                               res.render('pokemons/index.html', { admins: admins, infos:infos, formations: formations, pokemons: pokemons, endpoint: '/' + formations._id.toString()});
                            }
                        });
                    });
                });
            });
        });
    });
});

router.get('/edit/loisirs/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Infos.find({}).limit(1).then(infos => {
            Pokemon.find({}).then(pokemons => {
                Loisirs.findById(req.params.id).then(loisirs => {
                    Admin.find({}).limit(1).then(admins => {
                        Infos.find({}).limit(1).then(infos => {
                            if (req.session.passport) {
                                res.render('pokemons/edit_loisirs.html', { pokemon: pokemon , admins: admins, infos:infos, loisirs: loisirs, user: req.session.passport.user , endpoint: '/' + loisirs._id.toString() });
                            } else {
                               res.render('pokemons/index.html', { admins: admins, infos:infos, loisirs: loisirs, pokemons: pokemons, endpoint: '/' + loisirs._id.toString()});
                            }
                        });
                    });
                });
            });
        });
    });
});

router.get('/edit/competence/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Infos.find({}).limit(1).then(infos => {
            Pokemon.find({}).then(pokemons => {
                Competence.findById(req.params.id).then(competence => {
                    Admin.find({}).limit(1).then(admins => {
                        Infos.find({}).limit(1).then(infos => {
                            if (req.session.passport) {
                                res.render('pokemons/edit_competence.html', { pokemon: pokemon , admins: admins, infos:infos, competence: competence, user: req.session.passport.user , endpoint: '/' + competence._id.toString() });
                            } else {
                               res.render('pokemons/index.html', { admins: admins, infos:infos, competence: competence, pokemons: pokemons, endpoint: '/' + competence._id.toString()});
                            }
                        });
                    });
                });
            });
        });
    });
});

router.get('/sup/experience/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Experience.findOneAndRemove({ _id: req.params.id }).then(() => {
            if (req.session.passport) {
                res.render('/', { user: req.session.passport.user });
            } else {
               res.render('/', { admins: admins, pokemons: pokemons});
            }
        });
    });
});

router.get('/sup/formation/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Formation.findOneAndRemove({ _id: req.params.id }).then(() => {
            if (req.session.passport) {
                res.render('/', { user: req.session.passport.user });
            } else {
               res.render('/', { admins: admins, pokemons: pokemons});
            }
        });
    });
});

router.get('/sup/loisirs/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Loisirs.findOneAndRemove({ _id: req.params.id }).then(() => {
            if (req.session.passport) {
                res.render('/', { user: req.session.passport.user });
            } else {
               res.render('/', { admins: admins, pokemons: pokemons});
            }
        });
    });
});

router.get('/sup/competence/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Competence.findOneAndRemove({ _id: req.params.id }).then(() => {
            if (req.session.passport) {
                res.render('/', { user: req.session.passport.user });
            } else {
               res.render('/', { admins: admins, pokemons: pokemons});
            }
        });
    });
});

router.get('/experience/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Infos.find({}).limit(1).then(infos => {
            Pokemon.find({}).then(pokemons => {
                Experience.findById(req.params.id).then(experiences => {
                    Admin.find({}).limit(1).then(admins => {
                        Infos.find({}).limit(1).then(infos => {
                            if (req.session.passport) {
                                res.render('pokemons/show.html', { pokemon: pokemon , admins: admins, infos:infos, experiences: experiences, user: req.session.passport.user , endpoint: '/' + experiences._id.toString()});
                            } else {
                               res.render('pokemons/show.html', { admins: admins, infos:infos, experiences: experiences, pokemons: pokemons, endpoint: '/' + experiences._id.toString()});
                            }
                        }, err => res.status(500).send(err));
                    });
                });
            });
        });
    });
});

router.get('/formation/:id', (req, res) => {
    Admin.find({}).limit(1).then(admins => {
        Infos.find({}).limit(1).then(infos => {
            Pokemon.find({}).then(pokemons => {
                Formation.findById(req.params.id).then(formations => {
                    Admin.find({}).limit(1).then(admins => {
                        Infos.find({}).limit(1).then(infos => {
                            if (req.session.passport) {
                                res.render('pokemons/show_formation.html', { pokemon: pokemon , admins: admins, infos:infos, formations: formations, user: req.session.passport.user , endpoint: '/' + formations._id.toString()});
                            } else {
                               res.render('pokemons/show_formation.html', { admins: admins, infos:infos, formations: formations, pokemons: pokemons, endpoint: '/' + formations._id.toString()});
                            }
                        }, err => res.status(500).send(err));
                    });
                });
            });
        });
    });
});

router.post('/infos', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(new Infos())
    }).then(infos => {
        infos.age = req.body.age;
        infos.permis = req.body.permis;
        infos.ville = req.body.ville;
        infos.email = req.body.email;
        infos.skype = req.body.skype;
        infos.linkedin = req.body.linkedin;
        infos.situation = req.body.situation;
        infos.recherche = req.body.recherche;
        infos.facebook = req.body.facebook;
        infos.twiter = req.body.twiter;
        infos.linkedin = req.body.linkedin;
        infos.description = req.body.description;
        /*admin.number = req.body.number;
        admin.types = req.body.types;*/

        if(req.files) infos.picture = req.files[0].filename;

        return infos.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('/formation', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(new Formation())
    }).then(formation => {
        formation.titre = req.body.titre;
        formation.description = req.body.description;
        formation.lien = req.body.lien;
        if(req.files) formation.screenshot = req.files[0].filename;

        return formation.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('edit/formation/:id?', (req, res) => {

    new Promise((resolve, reject) => {
        if(req.params.id) {
            Formation.findById(req.params.id).then(resolve, reject);
        }
        else {
            resolve(new Formation())
        }
    }).then(formation => {
        formation.titre = req.body.titre;
        formation.ecole = req.body.ecole;
        formation.datedebut = req.body.datedebut;
        formation.datefin = req.body.datefin;
        formation.description = req.body.description;
        formation.diplome = req.body.diplome;

        return formation.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('/titrecompetence', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(new Titrecompetence())
    }).then(titrecompetence => {
        titrecompetence.titre = req.body.titre;

        return titrecompetence.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('/competence', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(new Competence())
    }).then(competence => {
        competence.titre = req.body.titre;
        competence.competence = req.body.competence;
        competence.rating = req.body.rating;

        return competence.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('edit/competence/:id?', (req, res) => {

    new Promise((resolve, reject) => {
        if(req.params.id) {
            Competence.findById(req.params.id).then(resolve, reject);
        }
        else {
            resolve(new Competence())
        }
    }).then(experience => {
        competence.titre = req.body.titre;
        competence.competence = req.body.competence;
        competence.rating = req.body.rating;

        return competence.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('/loisirs', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(new Loisirs())
    }).then(loisirs => {
        loisirs.titre = req.body.titre;
        loisirs.loisir = req.body.loisir;

        return loisirs.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('edit/loisirs/:id?', (req, res) => {

    new Promise((resolve, reject) => {
        if(req.params.id) {
            Loisirs.findById(req.params.id).then(resolve, reject);
        }
        else {
            resolve(new Loisirs())
        }
    }).then(experience => {
        loisirs.titre = req.body.titre;
        loisirs.loisir = req.body.loisir;

        return loisirs.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});


router.post('/experience', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(new Experience())
    }).then(experience => {
        experience.titre = req.body.titre;
        experience.description = req.body.description;
        experience.lien = req.body.lien;
        if(req.files) experience.screenshot = req.files[0].filename;

        return experience.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});


router.post('edit/experience/:id?', (req, res) => {

    new Promise((resolve, reject) => {
        if(req.params.id) {
            Experience.findById(req.params.id).then(resolve, reject);
        }
        else {
            resolve(new Experience())
        }
    }).then(experience => {
        experience.titre = req.body.titre;
        experience.entreprise = req.body.entreprise;
        experience.date = req.body.date;
        experience.description = req.body.description;
        experience.contrat = req.body.contrat;
        experience.location = req.body.location;
        if(req.files) experience.logo = req.files[0].filename;

        return experience.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

router.post('/admin', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(new Admin())
    }).then(admin => {
        console.log(req)
        admin.name = req.body.name;
        admin.titre = req.body.titre;
        admin.accroche = req.body.accroche;
        
        if(req.files) {
            admin.logo = req.files[0].filename;
            admin.background = req.files[1].filename;
        }
        return admin.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        res.locals.login = req.isAuthenticated();
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;