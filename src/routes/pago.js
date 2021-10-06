const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/pago RR
router.post("/pago", (req, res) => {
    console.log("Creando pago");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into pago (numero_factura, id_boleto, costo_total) values (?,?,?)',
        [est.numero_factura, est.id_boleto, est.costo_total], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//GET:/pago RR
router.get("/pago", (req, res) => {
    console.log("Obteniendo Lista de pago");
    mysqlConnection.query('Select * from pago', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/pago/:id RR
router.get("/pago/:numero_factura", (req, res) => {
    console.log("Obteniendo pago");
    mysqlConnection.query('Select * from pago where numero_factura = ?', [req.params.numero_factura], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/pago/:id RR
router.put("/pago/:numero_factura", (req, res) => {
    console.log("Actualizando pago");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update pago set id_boleto = ?, costo_total = ? where numero_factura = ?',
        [est.id_boleto, est.costo_total, req.params.numero_factura], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//DELETE:/pago/id RR
router.delete("/pago/:numero_factura", (req, res) => {
    console.log("Eliminando Pago");
    mysqlConnection.query('delete from pago where numero_factura = ?',
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