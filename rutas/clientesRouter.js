import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";


//DEFINICION DEL MODELO
const Clientes = sequelize.define('Clientes', {
    email: DataTypes.STRING(150),
    nombre: DataTypes.STRING(150),
    direccion: DataTypes.STRING(150),
    cpostal: DataTypes.STRING(10),
    poblacion: DataTypes.STRING(100),
    password: DataTypes.STRING(150)


}, { tableName: 'clientes', timestamps: false });

const Facturas = sequelize.define('Facturas', {
    numero: DataTypes.STRING(15),
    fecha: DataTypes.DATEONLY,
    direccion: DataTypes.STRING(150),
    poblacion: DataTypes.STRING(100),
    cpostal: DataTypes.STRING(10),
    nombre: DataTypes.STRING(150),
    clientesId: {
        type: DataTypes.INTEGER,
        field: "clientesId",
        references: {
            model: Clientes,
            key: "id"
        }
    },

}, { tableName: 'facturas', timestamps: false });


Clientes.hasMany(Facturas);

const router = express.Router();


router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {
        Clientes.findAll()
            .then(clientes => res.json({
                ok: true,
                data: clientes
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))
    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});

// GET de un solo Clientes
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Clientes.findOne({ where: { id: req.params.id } })
            // .then(Clientes => Clientes.get({plain: true}))
            .then(Clientes => res.json({
                ok: true,
                data: Clientes
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))
    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

// POST, creació d'un nou Clientes
router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Clientes.create(req.body)
            .then((item) => item.save())
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});


// put modificació d'un Clientes
router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Clientes.findOne({ where: { id: req.params.id } })
            .then((al) =>
                al.update(req.body)
            )
            .then((ret) => res.json({
                ok: true,
                data: ret
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }));

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});



// DELETE elimina l'Clientes id
router.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {
        Clientes.destroy({ where: { id: req.params.id } })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});


export default router;