const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/destiny', (req, res) => {
    console.log('get destiny')
    mysqlConnection.query('Select * from destiny', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
router.get('/destiny/:id', (req, res) => {
    console.log('get destiny')
    mysqlConnection.query('Select IATACode,city,country from Airport Inner Join destiny ON destiny.id_destiny = Airport.IATACode where destiny.id_destiny = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/destiny', (req, res) => {
    let dest = req.body;
    console.log('insert destiny')
    mysqlConnection.query('insert into destiny (id_destiny) values (?)',
        [dest.id_destiny], (err, result) => {
            if (!err) {
                res.send('Creado');
            } else {
                console.log(err);
                res.send('Error');
            }
        })
});

//Actualizar
router.put("/destiny/:id", (req, res) => {
    console.log("update destiny");
    let dest = req.body;
    console.log(dest);
    mysqlConnection.query('update destiny set id_destiny = ? where id_destiny = ?',
        [dest.id_destiny, req.params.id], (err, result) => {
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
router.delete("/destiny/:id", (req, res) => {
    console.log("update destiny ");
    mysqlConnection.query('delete from destiny where id_destiny = ?',
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