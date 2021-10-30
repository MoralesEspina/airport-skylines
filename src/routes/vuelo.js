const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Crear vuelo
router.post("/vuelos", (req, res) => {
    console.log("Creando Vuelo");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into vuelo (id_vuelo, id_ruta, id_avion,fecha_salida, id_estado ) values (?,?,?,?,?)',
        [est.id_vuelo, est.id_ruta, est.id_avion, est.fecha_salida, est.id_estado], (err, result) => {
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
router.post("/vuelosruta", (req, res) => {
    let vue = req.body;
    console.log(vue);
    console.log("Obteniendo Lista Vuelo");
    mysqlConnection.query('select v.id_vuelo, v.id_avion, r.id_ruta, r.origen, r.destino, r.precio_base, r.distancia_viaje, r.tiempo_viaje, r.fecha_creacion, e.descripcion from zint4hwvvzk5xj98.vuelo v  join zint4hwvvzk5xj98.ruta r on v.id_ruta = r.id_ruta join zint4hwvvzk5xj98.estado_vuelo e on v.id_estado= e.id_estado where v.id_vuelo = ? and r.id_ruta',
    [vue.id_vuelo, vue.id_ruta], (err, rows, fields) => {
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
    mysqlConnection.query('select v.id_vuelo, v.id_avion, r.id_ruta, r.origen, r.destino, r.precio_base, r.distancia_viaje, r.tiempo_viaje, r.fecha_creacion, e.descripcion from zint4hwvvzk5xj98.vuelo v  join zint4hwvvzk5xj98.ruta r on v.id_ruta = r.id_ruta join zint4hwvvzk5xj98.estado_vuelo e on v.id_estado= e.id_estado where id_vuelo = ?', [req.params.id_vuelo], (err, rows, fields) => {
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
    mysqlConnection.query('update vuelo set id_ruta = ?, id_avion = ?, fecha_salida = ?, id_estado = ? where id_vuelo = ?',
        [est.id_ruta, est.id_avion, est.fecha_salida,est.id_estado, req.params.id_vuelo], (err, result) => {
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

router.post("/vuelosruta", (req, res) => {
    console.log("Obteniendo Vuelo Especifico");
    let vue = req.body;
    console.log(vue);
    mysqlConnection.query('Select id_vuelo from vuelo where id_ruta = ? and id_avion = ? and fecha_salida = ? ',
        [vue.id_ruta, vue.id_avion, vue.fecha_salida], (err,rows, fields) => {
            if (!err) {
                res.status(201).send(rows);
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});



module.exports = router;