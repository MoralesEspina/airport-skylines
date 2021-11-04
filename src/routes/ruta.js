const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Ver Rutas
router.get("/rutas", (req, res) => {
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
router.get("/rutas/:id", (req, res) => {
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
router.post("/rutas", (req, res) => {
    console.log("Creando Rutas");
    let route = req.body;
    mysqlConnection.query('insert into ruta (precio_base, distancia_viaje, tiempo_viaje, fecha_creacion, origen, destino) values (?,?,?,CURDATE(),?,?)',
        [route.precio_base, route.distancia_viaje, route.tiempo_viaje, route.origen, route.destino], (err, result) => {
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
router.put("/rutas/:id", (req, res) => {
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
router.delete("/rutas/:id", (req, res) => {
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

router.post("/disponibilidad", (req, res) => {
    let ar = req.body;
    console.log("Rutas");
    console.log(ar);
    mysqlConnection.query('select aerolinea.nombre, ruta.origen, ruta.destino, ruta.distancia_viaje, ruta.tiempo_viaje ,ruta.precio_base ,vuelo.fecha_salida, estado_vuelo.descripcion, ruta.id_ruta, vuelo.id_vuelo, vuelo.id_avion from vuelo join ruta  join avion join aerolinea  join estado_vuelo  where ruta.origen = ? and ruta.destino = ? and ruta.id_ruta = vuelo.id_ruta and avion.id_avion = vuelo.id_avion and aerolinea.id_aerolinea = avion.aerolinea and vuelo.fecha_salida = ? and estado_vuelo.id_estado = avion.estado', 
    [ar.origen, ar.destino, ar.fecha_salida ],(err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});

module.exports = router;