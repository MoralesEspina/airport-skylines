const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Visualizar Aeropuertos
router.get("/aeropuertos", (req, res) => {
    console.log("Obteniendo Lista de Aeropuertos");
    mysqlConnection.query('Select * from aeropuerto', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});


//Ver Aeropuerto en Especifico
router.get("/aeropuertos/:id", (req, res) => {
    console.log("Obteniendo Aeropuerto");
    mysqlConnection.query('Select * from aeropuerto where iataCode = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Aeropuerto
router.post("/aeropuertos", (req, res) => {
    console.log("Creando Aeropuerto");
    let air = req.body;

    mysqlConnection.query('insert into aeropuerto (iataCode, ciudad, pais) values (?,?,?)',
        [air.iataCode, air.ciudad, air.pais], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar Aeropuerto
router.put("/aeropuertos/:id", (req, res) => {
    console.log("Actualizando Aeropuerto");
    let air = req.body;
    
    mysqlConnection.query('update aeropuerto set iataCode = ?, ciudad = ?, pais = ? where iataCode = ?',
        [air.iataCode, air.ciudad, air.pais, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Aeropuerto
router.delete("/aeropuertos/:id", (req, res) => {
    console.log("Eliminando Aeropuerto");
    mysqlConnection.query('delete from aeropuerto where iataCode = ?',
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