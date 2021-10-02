const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Visualizar estado_cancelacion
router.get("/estado", (req, res) => {
    console.log("Obteniendo Lista de estado");
    mysqlConnection.query('Select * from estado', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});


//Ver estado_cancelacion
router.get("/estado/:id", (req, res) => {
    console.log("Obteniendo estado");
    mysqlConnection.query('Select * from ruta where id_estado_cancelacion = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear estado_cancelacion
router.post("/estado", (req, res) => {
    console.log("Creando estado");
    let route = req.body;

    mysqlConnection.query('insert into estado (id_estado_cancelacion, descripcion) values (?,?,?,?,?,?,?)',
        [route.id_estado_cancelacion, route.descripcion], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar estado_cancelacion
router.put("/estado/:id", (req, res) => {
    console.log("Actualizando estado");
    let route = req.body;

    mysqlConnection.query('update estado set descripcion = ?',
        [route.descripcion], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar estado_cancelacion
router.delete("/estado/:id", (req, res) => {
    console.log("Eliminando estado ");
    mysqlConnection.query('delete from ruta where id_estado_cancelacion = ?',
        [ req.params.id], (err, result) => {
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