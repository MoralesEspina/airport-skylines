const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


//Ver tabla vuelo 
router.get("/flight", (req, res) => {
    mysqlConnection.query('Select * from flight', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

//Ver vuelo Individual
router.get("/flight/:code", (req, res) => {
    mysqlConnection.query('Select * from flight where code = ?', [req.params.code], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear vuelo
router.post("/flight", (req, res) => {
    let fli = req.body;
    mysqlConnection.query('insert into flight (date_, state) values (?,?)',
        [fli.date_, fli.state], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar persona
router.put("/flight/:code", (req, res) => {
    let fli = req.body;
    mysqlConnection.query('update flight set date_ = ?, state = ?',
        [fli.date_, fli.state, req.params.code], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar vuelo
router.delete("/flight/:code", (req, res) => {
    mysqlConnection.query('delete from flight where code = ?',
        [ req.params.code], (err, result) => {
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