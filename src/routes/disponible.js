const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

router.get("/disponibles/:id_ruta", (req, res) => {
    console.log("Obteniendo Vuelo Disponible");
    mysqlConnection.query('select z.nombre, r.origen, r.destino, r.distancia_viaje, r.tiempo_viaje ,r.precio_base ,v.fecha_hora_salida, x.descripcion from vuelo v join ruta r join avion a join aerolinea z join estado_vuelo x where r.id_ruta = v.id_ruta and a.id_avion = v.id_avion and z.id_aerolinea = a.aerolinea and x.id_estado = a.estado and v.id_ruta = ?',
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
    mysqlConnection.query('select z.nombre, r.origen, r.destino, r.distancia_viaje, r.tiempo_viaje ,r.precio_base ,v.fecha_hora_salida, x.descripcion from vuelo v join ruta r join avion a join aerolinea z join estado_vuelo x where r.id_ruta = v.id_ruta and a.id_avion = v.id_avion and z.id_aerolinea = a.aerolinea and x.id_estado = a.estado',
        [req.params.id_ruta], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});


module.exports = router;