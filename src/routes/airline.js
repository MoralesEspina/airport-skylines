const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//Visualizar tabla aerolinea
router.get("/airline", (req, res) => {
    mysqlConnection.query('Select * from airline', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver aerolinea
router.get("/airline/:id", (req, res) => {
    mysqlConnection.query('Select * from airline where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear aerolinea
router.post("/airline", (req, res) => {
    let air = req.body;
    mysqlConnection.query('insert into airline (name) values (?)',
        [air.name], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar aerolinea
router.put("/airline/:id", (req, res) => {
    let air = req.body;
    mysqlConnection.query('update airline set name = ? where id = ?',
        [air.name, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar aerolinea
router.delete("/airline/:id", (req, res) => {
    mysqlConnection.query('delete from airline where id = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Eliminado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});
module.exports = router;