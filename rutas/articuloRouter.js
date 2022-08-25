import express from 'express';
import { DataTypes } from "sequelize";
import sequelize from "../loadSequelize.js";


//DEFINICION DEL MODELO
const Articulo = sequelize.define('Articulo', {
    nombre: DataTypes.STRING(150),
    descripcion: DataTypes.STRING(1500),
    precio: DataTypes.FLOAT(10,2),
    estoc: DataTypes.FLOAT(10,2)


}, { tableName: 'articulo', timestamps: false });



const router = express.Router();

// GET lista de todos los articulos
// vinculamos la ruta /api/articulos a la función declarada
// si todo ok devolveremos un objeto tipo:
//     {ok: true, data: [lista_de_objetos_articulo...]}
// si se produce un error:
//     {ok: false, error: mensaje_de_error}

router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {
        Articulo.findAll()
            .then(articulos => res.json({
                ok: true,
                data: articulos
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

// GET de un solo articulo
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Articulo.findOne({ where: { id: req.params.id } })
            // .then(Articulo => Articulo.get({plain: true}))
            .then(Articulo => res.json({
                ok: true,
                data: Articulo
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



// POST, creació d'un nou articulo
router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {
        Articulo.create(req.body)
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


// put modificació d'un articulo
router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {
        Articulo.findOne({ where: { id: req.params.id } })
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



// DELETE elimina l'articulo id
router.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {
        Articulo.destroy({ where: { id: req.params.id } })
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
