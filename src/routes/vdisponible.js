const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

router.get("/disponibles/:id_ruta", (req, res) => {
    console.log("Obteniendo Vuelo Disponible");
    mysqlConnection.query('select aerolinea.nombre, ruta.origen, ruta.destino, ruta.distancia_viaje, ruta.tiempo_viaje ,ruta.precio_base ,vuelo.fecha_salida, estado_vuelo.descripcion from vuelo join ruta  join avion join aerolinea  join estado_vuelo  where ruta.id_ruta = vuelo.id_ruta  and avion.id_avion = vuelo.id_avion and aerolinea.id_aerolinea = avion.aerolinea and estado_vuelo.id_estado = avion.estado and vuelo.id_ruta = ?',
        [req.params.id_ruta], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

router.get("/disponibles", (req, res) => {
    console.log("Obteniendo Vuelo Disponible");
    mysqlConnection.query('select aerolinea.nombre, ruta.origen, ruta.destino, ruta.distancia_viaje, ruta.tiempo_viaje ,ruta.precio_base ,vuelo.fecha_salida, estado_vuelo.descripcion from vuelo join ruta  join avion join aerolinea  join estado_vuelo  where ruta.id_ruta = vuelo.id_ruta  and avion.id_avion = vuelo.id_avion and aerolinea.id_aerolinea = avion.aerolinea and estado_vuelo.id_estado = avion.estado',
        [req.params.id_ruta], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

router.post("/disponibilidad", (req, res) => {
    console.log("Obteniendo Vuelo Disponible");
    mysqlConnection.query('select aerolinea.nombre, ruta.origen, ruta.destino, ruta.distancia_viaje, ruta.tiempo_viaje ,ruta.precio_base ,vuelo.fecha_salida, estado_vuelo.descripcion from vuelo join ruta  join avion join aerolinea  join estado_vuelo  where ruta.id_ruta = vuelo.id_ruta  and ruta.origen = ? and ruta.destino = ? and vuelo.fecha_salida = ?',
        [req.origen, req.destino, req.fecha_salida], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


module.exports = router;