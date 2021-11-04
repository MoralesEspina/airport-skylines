const express = require('express');
const router = express.Router();
const { check, validationResult }= require('express-validator');
const mysqlConnection = require('../configurations/db-conf');

//create de asientos
router.post("/asientos", [check('numero', 'es requerido').notEmpty().isNumeric().withMessage('Ingrese solo numeros'), 
check('letra', 'es requerido').notEmpty().isAlpha().withMessage('Ingrese solo una leta')],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else{
    console.log("Creando Asiento");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into asiento (id_asiento, numero, letra ) values (?,?,?)',
        [est.id_asiento, est.numero, est.letra], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("Asiento Creado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
    }
});

//Obtención tabla asiento
router.get("/asientos", (req, res) => {
    console.log("Obteniendo Lista Asiento");
    mysqlConnection.query('Select * from asiento', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtención de asiento por id
router.get("/asientos/:id_asiento", (req, res) => {
    console.log("Obteniendo Asiento");
    mysqlConnection.query('Select * from asiento where id_asiento = ?', [req.params.id_asiento], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualización de asiento
router.put("/asientos/:id_asiento", [check('numero', 'es requerido').notEmpty().isNumeric().withMessage('Ingrese solo numeros'), 
check('letra', 'es requerido').notEmpty().isAlpha().withMessage('Ingrese solo una leta')],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else{
    console.log("Actualizando Asiento");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update asiento set numero = ?, letra = ? where id_asiento = ?',
        [est.numero, est.letra, req.params.id_asiento], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Asiento Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
    }
});

// Eliminación de asiento
router.delete("/asientos/:id_asiento", (req, res) => {
    console.log("Eliminando Asiento");
    mysqlConnection.query('delete from asiento where id_asiento = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Asiento Eliminado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;