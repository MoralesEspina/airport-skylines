const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Visualizar Rutas
router.get("/ruta", (req, res) => {
    console.log("Obteniendo Lista de Rutas");
    mysqlConnection.query('Select * from ruta', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});


//Ver Ruta en Especifico
router.get("/ruta/:id", (req, res) => {
    console.log("Obteniendo Ruta");
    mysqlConnection.query('Select * from ruta where id_ruta = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Ruta
router.post("/ruta", (req, res) => {
    console.log("Creando Rutas");
    let route = req.body;

    mysqlConnection.query('insert into ruta (id_ruta, precio_base, distancia_viaje, tiempo_viaje, fecha_creacion, origen, destino) values (?,?,?,?,?,?,?)',
        [route.id_ruta, route.precio_base, route.distancia_viaje, route.tiempo_viaje, route.fecha_creacion, route.origen, route.destino], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar Ruta
router.put("/ruta/:id", (req, res) => {
    console.log("Actualizando Rutas");
    let route = req.body;

    mysqlConnection.query('update ruta set precio_base = ?, distancia_viaje = ?,tiempo_viaje = ?, fecha_creacion = ?, origen = ?, destino = ? where id_ruta = ?',
        [route.precio_base, route.distancia_viaje, route.tiempo_viaje, route.fecha_creacion, route.origen, route.destino, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Ruta
router.delete("/ruta/:id", (req, res) => {
    console.log("Eliminando Rutas ");
    mysqlConnection.query('delete from ruta where id_ruta = ?',
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