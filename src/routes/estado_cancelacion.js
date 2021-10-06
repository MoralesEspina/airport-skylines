const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Visualizar estado_cancelacion
router.get("/estado_cancelacion", (req, res) => {
    console.log("Obteniendo Lista de estado_cancelacion");
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
router.get("/estado_cancelacion/:id", (req, res) => {
    console.log("Obteniendo estado_cancelacion");
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
router.post("/estado_cancelacion", (req, res) => {
    console.log("Creando estado_cancelacion");
    let route = req.body;

    mysqlConnection.query('insert into estado_cancelacion (id_estado_cancelacion, descripción) values (?,?)',
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
router.put("/estado_cancelacion/:id", (req, res) => {
    console.log("Actualizando estado_cancelacion");
    let route = req.body;

    mysqlConnection.query('update estado_cancelacion set descripción = ? where id_estado_cancelacion = ?',
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
router.delete("/estado_cancelacion/:id", (req, res) => {
    console.log("Eliminando estado_cancelacion ");
    mysqlConnection.query('delete from estado_cancelacion where id_estado_cancelacion = ?',
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