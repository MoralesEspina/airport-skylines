const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Visualizar cancelacion_vuelos
router.get("/vuelos", (req, res) => {
    console.log("Obteniendo Lista de vuelos");
    mysqlConnection.query('Select * from vuelos', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});


//Ver cancelacion_vuelos
router.get("/vuelos/:id", (req, res) => {
    console.log("Obteniendo vuelos");
    mysqlConnection.query('Select * from ruta where id_cancelacion_vuelos = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear cancelacion_vuelos
router.post("/vuelos", (req, res) => {
    console.log("Creando vuelos");
    let route = req.body;

    mysqlConnection.query('insert into vuelos (id_cancelacion_vuelos, motivo, estado, vuelo, fecha_reasignada) values (?,?,?,?,?,?,?)',
        [route.id_cancelacion_vuelos, route.motivo, route.estado, route.vuelo, route.fecha_reasignada], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar cancelacion_vuelos
router.put("/vuelos/:id", (req, res) => {
    console.log("Actualizando vuelos");
    let route = req.body;

    mysqlConnection.query('update vuelos set motivo = ?, estado = ?,vuelo = ?, fecha_reasignada = ?',
        [route.motivo, route.estado, route.vuelo, route.fecha_reasignada], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar cancelacion_vuelos
router.delete("/vuelos/:id", (req, res) => {
    console.log("Eliminando vuelos ");
    mysqlConnection.query('delete from ruta where id_cancelacion_vuelos = ?',
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