//Configuraciones
const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs'); //Instalacion npm install --save bcryptjs && npm uninstall --save bcrypt
const _ = require('underscore');
const app = express()



app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    Usuario.find({}, 'nombre email role')
        .skip(desde)
        .limit(5)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.count((err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            })

        });
})

app.post('/usuario', function(req, res) {
    let body = req.body;
    //crear nueva instancia del esquema usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es requerido'
    //     })

    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }
});
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre',
        'email',
        'img',
        'role',
        'estado'
    ]); //arreglo de propiedades que si se pueden actualizar



    //finfByIdAndUpdate pertenece a mongoose
    //{ new: true, runValidators: true } Doc Mongoose: retorna el objeto modificado.
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
})

module.exports = app;