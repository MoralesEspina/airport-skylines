const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/pago RR cambio de CVV 
router.post("/pagos", (req, res) => {
    console.log("Creando pago");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into pago (numero_factura, id_boleto, costo_total, Tarjeta_Credito, Nombre_Propietario, Fecha_Exp, cvv) values (?,?,?,?,?,?,?)',
        [est.numero_factura, est.id_boleto, est.costo_total, est.Tarjeta_Credito, est.Nombre_Propietario, est.Fecha_Exp, est.cvv], (err, result) => {
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
router.get("/pagos", (req, res) => {
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

//GET:/pago/:id 
router.get("/pagos/:numero_factura", (req, res) => {
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

//PUT:/pago/:id 
router.put("/pagos/:numero_factura", (req, res) => {
    console.log("Actualizando pago");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update pago set id_boleto = ?, costo_total = ?, Tarjeta_Credito = ?, Nombre_Propietario = ?, Fecha_Exp = ?, cvv = ? where numero_factura = ?',
        [est.numero_factura, est.id_boleto, est.costo_total, est.Tarjeta_Credito, est.Nombre_Propietario, est.Fecha_exp, est.cvv], (err, result) => {
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
router.delete("/pagos/:numero_factura", (req, res) => {
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