const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Ingreso de asientos
router.post("/asiento", (req, res) => {
    console.log("Create asiento ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into asiento (id_asiento, numero, letra ) values (?,?,?)',
        [est.numero_factura, est.id_boleto, est.costo_total], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("creado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Obtención tabla asiento
router.get("/asiento", (req, res) => {
    console.log("obtener lista asiento");
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
router.get("/asiento/:id_asiento", (req, res) => {
    console.log("obtener asiento");
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
router.put("/asiento/:id_asiento", (req, res) => {
    console.log("actualización de asiento");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update asiento set numero = ?, letra = ? where id_asiento = ?',
        [est.numero, est.letra, req.params.id_asiento], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

// Eliminación de asiento
router.delete("/asiento/:id_asiento", (req, res) => {
    console.log("eliminación asiento ");
    mysqlConnection.query('delete from asiento where id_asiento = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("eliminado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;