const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/
router.post("/vuelos", (req, res) => {
    console.log("Create vuelos ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into vuelo (id_cancelacion_vuelos, motivo, estado, vuelo, fecha_reasignacion) values (?,?,?)',
        [est.id_cancelacion_vuelos,est.motivo,est.estado,est.vuelo,est.fecha_reasignacion ], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//GET:/
router.get("/vuelos", (req, res) => {
    console.log("get list of vuelos");
    mysqlConnection.query('Select * from vuelos', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/
router.get("/vuelo/:id_cancelacion_vuelos", (req, res) => {
    console.log("get pago");
    mysqlConnection.query('Select * from pago where id_cancelacion_vuelos = ?', [req.params.id_cancelacion_vuelos], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/
router.put("/vuelos/:id_cancelacion_vuelos", (req, res) => {
    console.log("update vuelos ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update pago set motivo = ?, estado = ?, vuelo = ?, fecha_reasignacion = ? where id_cancelacion_vuelos = ?',
        [est.motivo,est.estado,est.vuelo,est.fecha_reasignacion], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//DELETE:/
router.delete("/vuelos/:id_cancelacion_vuelos", (req, res) => {
    console.log("delete vuelos ");
    mysqlConnection.query('delete from vuelo where id_cancelacion_vuelos = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;