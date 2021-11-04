const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//lista de estado_vuelo
router.get("/estado_vuelos", (req, res) => {
    console.log("obteniendo lista estado de vuelo");
    mysqlConnection.query('select * from estado_vuelo', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
//Lista estado vuelo por id
router.get("/estado_vuelos/:id", (req, res) => {
    console.log('obteniendo estado vuelo id');
    mysqlConnection.query('select * from estado_vuelo where id_estado =?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
            res.send('error');
        }
    })

});

//crear estado_vuelo
router.post('/estado_vuelos', [check('id_estado', 'es requerido').notEmpty().isInt().withMessage('Ingresar en números'),
check('descripcion', 'es requerido').notEmpty().isString().withMessage('Ingresar descripcción')], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        console.log('creando estado_vuelo');
        let est = req.body;
        mysqlConnection.query('insert into estado_vuelo (id_estado, descripcion) values (?,?)', [est.id_estado, est.descripcion], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send('Creado Correctamente');
            }
            else {
                console.log(err);
                res.send('error' + err);
            }
        });

    }



});
//actualizar estado_vuelo
router.put('/estado_vuelos/:id', [check('id_estado', 'es requerido').notEmpty().isInt().withMessage('Ingresar en números'),
check('descripcion', 'es requerido').notEmpty().isString().withMessage('Ingresar descripcción')], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        console.log('actualizando estado_vuelo');
        let est = req.body;
        console.log(est);
        mysqlConnection.query('update estado_vuelo set id_estado=?, descripcion=? where id_estado=?', [est.id_estado, est.descripcion, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send('Actualizado Correctamente');
            }
            else {
                console.log(err);
                res.send('error' + err);
            }
        });

    }


});

//eliminar estado_vuelo
router.delete('/estado_vuelos/:id', (req, res) => {
    console.log('eliminando estado_vuelo');
    mysqlConnection.query('delete from estado_vuelo where id_estado=?', [req.params.id], (err, result) => {
        if (!err) {
            console.log(result);
            res.status(202).send('Eliminado Correctamente');
        }
        else {
            console.log(err);
            res.send('error');
        }
    })

});
module.exports = router;