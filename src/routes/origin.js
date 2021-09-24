const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/origin', (req, res) => {
    console.log('get origin')
    mysqlConnection.query('Select * from origin', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
router.get('/origin/:id', (req, res) => {
    console.log('get origin')
    mysqlConnection.query('Select IATACode,city,country from Airport Inner Join origin ON origin.id_origin = Airport.IATACode where origin.id_origin = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/origin', (req, res) => {
    let ori = req.body;
    console.log('insert origin')
    mysqlConnection.query('insert into origin (id_origin) values (?)',
        [ori.id_origin], (err, result) => {
            if (!err) {
                res.send('Creado');
            } else {
                console.log(err);
                res.send('Error');
            }
        })
});

//Actualizar
router.put("/origin/:id", (req, res) => {
    console.log("update origin");
    let ori = req.body;
    console.log(ori);
    mysqlConnection.query('update origin set id_origin = ? where id_origin = ?',
        [ori.id_origin, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Eliminar
router.delete("/origin/:id", (req, res) => {
    console.log("update origin ");
    mysqlConnection.query('delete from origin where id_origin = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Eliminado");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});


module.exports = router;