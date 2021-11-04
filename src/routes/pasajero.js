const express = require('express');
const router = express.Router();
const { check, validationResult }= require('express-validator');
const mysqlConnection = require('../configurations/db-conf');

//POST:/pasajero RR validacion
router.post("/pasajeros",[check('numero_doc', 'es requerido').notEmpty().isNumeric().withMessage('Ingrese solo numeros'), check('tipo_doc', 'es requerido').notEmpty(),
check('nombres', 'es requerido').notEmpty(),check('apellidos', 'es requerido').notEmpty(),check('fecha_nacimiento', 'es requerido').notEmpty().isDate().withMessage('Ingrese una fecha valida formato YYYY/MM/DD'),
check('genero', 'es requerido').notEmpty().isAlpha().withMessage('solo una palabra'),check('nacionalidad', 'es requerido').notEmpty().isAlpha().withMessage('solo una palabra')], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else{
    console.log("Creando pasajero ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into pasajero (numero_doc, tipo_doc, nombres, apellidos, fecha_nacimiento, genero, nacionalidad ) values (?,?,?,?,?)',
        [est.numero_doc, est.tipo_doc, est.nombres, est.apellidos, est.fecha_nacimiento, est.genero, est.nacionalidad], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
    }
});

//GET:/pasajero RR
router.get("/pasajeros", (req, res) => {
    console.log("Obteniendo Lista de pasajero");
    mysqlConnection.query('Select * from pasajero', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/pasajero/:id RR
router.get("/pasajeros/:id_pasajero", (req, res) => {
    console.log("Obteniendo pasajero");
    mysqlConnection.query('Select * from pasajero where numero_doc = ?', [req.params.numero_doc], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/pasajero/:id RR
router.put("/pasajeros/:id_pasajero", [check('tipo_doc', 'es requerido').notEmpty(),check('nombres', 'es requerido').notEmpty(),
check('apellidos', 'es requerido').notEmpty(),check('fecha_nacimiento', 'es requerido').notEmpty().isDate().withMessage('Ingrese una fecha valida formato YYYY/MM/DD'),
check('genero', 'es requerido').notEmpty().isAlpha().withMessage('solo una palabra'),check('nacionalidad', 'es requerido').notEmpty().isAlpha().withMessage('solo una palabra')], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else{
    console.log("Actualizando pasajero ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update pasajero set tipo_doc = ?, nombres = ?, apellidos = ?, fecha_nacimiento = ?, genero = ?, nacionalidad = ? where numero_doc = ?',
        [est.tipo_doc, est.nombres, est.apellidos, est.fecha_nacimiento, est.genero, est.nacionalidad], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
    }
});

//DELETE:/pasajero/id RR
router.delete("/pasajeros/:id_pasajero", (req, res) => {
    console.log("Eliminando pasajero ");
    mysqlConnection.query('delete from pasajero where numero_doc = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Eliminado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


module.exports = router;