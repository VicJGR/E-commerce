import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";


//DEFINICION DEL MODELO
const Facturas = sequelize.define('Facturas', {
    numero: DataTypes.STRING(15),
    fecha: DataTypes.DATEONLY,
    direccion: DataTypes.STRING(150),
    poblacion: DataTypes.STRING(100),
    cpostal: DataTypes.STRING(10),
    nombre: DataTypes.STRING(150), 
    clientes_id: DataTypes.INTEGER, 


}, { tableName: 'facturas', timestamps: false });

const Articulo = sequelize.define('Articulo', {
    nombre: DataTypes.STRING(150),
    descripcion: DataTypes.STRING(1500),
    precio: DataTypes.FLOAT(10,2),
    estoc: DataTypes.FLOAT(10,2)


}, { tableName: 'articulo', timestamps: false });

const Lineas = sequelize.define('Lineas', {
    cantidad: DataTypes.FLOAT(10,2),
    Facturas_id: {
        type: DataTypes.INTEGER,
        field: "FacturasId",
        references: {
            model: Facturas,
            key: "id"
        }
    },
    Articulo_id: {
        field: "ArticuloId",
        type: DataTypes.INTEGER,
        references: {
            model: Articulo,
            key: "id"
        }
    }},
     { tableName: 'lineas', timestamps: false });


    Facturas.belongsToMany(Articulo, {through: Lineas});
    Articulo.belongsToMany(Facturas, {through: Lineas});


const router = express.Router();

router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {
        Facturas.findAll()
            .then(facturas => res.json({
                ok: true,
                data: facturas
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

router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Facturas.findOne({ where: { id: req.params.id } })
            // .then(Facturas => Facturas.get({plain: true}))
            .then(Facturas => res.json({
                ok: true,
                data: Facturas
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

router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Facturas.create(req.body)
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

router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Facturas.findOne({ where: { id: req.params.id } })
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
        Facturas.destroy({ where: { id: req.params.id } })
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