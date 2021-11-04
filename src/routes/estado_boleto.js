const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//lista estado_boleto
router.get('/estado_boletos', (req, res) => {
    console.log('obteniendo lista estado_boleto');
    mysqlConnection.query('select * from estado_boleto', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

// lista ID estado_boleto
router.get('/estado_boleto/:id', (req, res) => {
    console.log('obteniendo id estado_boleto');
    mysqlConnection.query('select * from estado_boleto where idestado_boleto=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
            res.send('error');
        }
    })

});
// crear estado_boleto
router.post('/estado_boletos', [check('idestado_boleto', 'es requerido').notEmpty().isInt().withMessage('Ingrece Números'),
check('descripcion', 'es requerido').notEmpty().isString], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        console.log('creando estado_boleto');
        let est = req.body;
        mysqlConnection.query('insert into estado_boleto (idestado_boleto, descripcion) values (?,?)', [est.idestado_boleto, est.descripcion], (err, result) => {
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
//actualizar estado_boleto
router.put('/estado_boletos/:id', [check('idestado_boleto', 'es requerido').notEmpty().isInt().withMessage('Ingrece Números'),
check('descripcion', 'es requerido').notEmpty().isString], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        console.log('actualizando estado_boleto');
        let est = req.body;
        console.log(est);
        mysqlConnection.query('update estado_boleto set idestado_boleto=?, descripcion=? where id=?', [est.idestado_boleto, est.descripcion, req.params.id], (err, result) => {
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
//eliminar estado_boleto
router.delete('/estado_boletos/:id', (req, res) => {
    console.log('eliminando estado_boleto');
    mysqlConnection.query('delete from estado_boleto where idestado_boleto=?', [req.params.id], (err, result) => {
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
