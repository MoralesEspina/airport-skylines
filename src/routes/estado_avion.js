const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


// ver estado_avion validacion
router.get('/estado_aviones', (req, res) => {
    console.log('obteniendo lista estado_avion');
    mysqlConnection.query('Select * from estado_avion', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    })
});
// estado_avion por ID 
router.get('/estado_aviones/:id', (req, res) => {
    console.log('obteniedo estado_avion id');
    mysqlConnection.query('select * from estado_avion where id_estado_avion=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
            res.send('error');
        }
    })

});
// crear estado_avion
router.post('/estado_aviones', [check('id_estado_avion', 'es requerido').notEmpty().isInt().withMessage('ingresar en números'),
check('descripcion', 'es requerido').notEmpty().isString().withMessage('ingrece descripción')], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        console.log('creando estado_avion');
        let est = req.body;
        mysqlConnection.query('insert into estado_avion (id_estado_avion, descripcion) values (?,?)', [est.id_estado_avion, est.descripcion], (err, result) => {
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
//actualizar estado_avion
router.put('/estado_aviones/:id', [check('id_estado_avion', 'es requerido').notEmpty().isInt().withMessage('ingresar en números'),
check('descripcion', 'es requerido').notEmpty().isString().withMessage('ingrece descripción')], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        console.log('actualizando estado_avion');
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estado_avion set descripcion=? where id_estado_avion=?', [est.descripcion, req.params.id], (err, result) => {
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
//eliminar estado_avion
router.delete('/estado_aviones/:id', (req, res) => {
    console.log('eliminando estado_avion');
    mysqlConnection.query('delete from estado_avion where id_estado_avion=?', [req.params.id], (err, result) => {
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