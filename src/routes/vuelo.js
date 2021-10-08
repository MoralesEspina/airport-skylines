const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Crear vuelo
router.post("/vuelos", (req, res) => {
    console.log("Creando Vuelo");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into vuelo (id_vuelo, id_ruta, id_avion,fecha_hora_salida, id_estado ) values (?,?,?,?,?)',
        [est.id_vuelo, est.id_ruta, est.id_avion, est.fecha_hora_salida, est.id_estado], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("Vuelo Creado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Obtener vuelo
router.get("/vuelos", (req, res) => {
    console.log("Obteniendo Lista Vuelo");
    mysqlConnection.query('Select * from vuelo', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener vuelo por id
router.get("/vuelos/:id_vuelo", (req, res) => {
    console.log("Obteniendo Vuelo");
    mysqlConnection.query('Select * from vuelo where id_vuelo = ?', [req.params.id_vuelo], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar vuelo
router.put("/vuelos/:id_vuelo", (req, res) => {
    console.log("Actualizando Vuelo");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update vuelo set id_ruta = ?, id_avion = ?, fecha_hora_salida = ?, id_estado = ? where id_vuelo = ?',
        [est.id_ruta, est.id_avion, est.fecha_hora_salida,est.id_estado, req.params.id_vuelo], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Vuelo Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Vuelo
router.delete("/vuelos/:id_vuelo", (req, res) => {
    console.log("Eliminando Vuelo");
    mysqlConnection.query('delete from vuelo where id_vuelo = ?',
        [req.params.id_vuelo], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Vuelo Borrado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;