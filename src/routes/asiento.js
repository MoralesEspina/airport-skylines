const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//create de asientos
router.post("/asientos", (req, res) => {
    console.log("Creando Asiento");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into asiento (numero, letra,tipo_asiento ) values (?,?,?)',
        [ est.numero, est.letra, est.tipo_asiento], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Asiento Creado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Obtención tabla asiento
router.get("/asientos", (req, res) => {
    console.log("Obteniendo Lista Asiento");
    mysqlConnection.query('Select * from asiento', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtención de asiento por id
router.get("/asientos/:id_asiento", (req, res) => {
    console.log("Obteniendo Asiento");
    mysqlConnection.query('Select * from asiento where id_asiento = ?', [req.params.id_asiento], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualización de asiento
router.put("/asientos/:id_asiento", (req, res) => {
    console.log("Actualizando Asiento");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update asiento set numero = ?, letra = ?, tipo_asiento = ? where id_asiento = ?',
        [est.numero, est.letra, req.params.id_asiento], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Asiento Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

// Eliminación de asiento
router.delete("/asientos/:id_asiento", (req, res) => {
    console.log("Eliminando Asiento");
    mysqlConnection.query('delete from asiento where id_asiento = ?',
        [req.params.id_asiento], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Asiento Eliminado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

router.post("/asientosocupados", (req, res) => {
    console.log("Obteniendo Lista Asiento Ocupados");
    let est = req.body;
    mysqlConnection.query('Select id_asiento from asiento_ocupado where id_avion = ? and id_vuelo = ?', 
    [ est.id_avion, est.id_vuelo], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

router.post("/insertarasientosocupados", (req, res) => {
    console.log("Insertando Asiento Ocupados");
    let est = req.body;
    mysqlConnection.query('insert into asiento_ocupado (id_asiento, id_avion, id_vuelo ) values (?,?,?)', 
    [est.id_asiento, est.id_avion, est.id_vuelo], (err, rows, fields,result) => {
        if (!err) {
            console.log(result);
            res.status(201).send("Asiento Creado Correctamente");
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
module.exports = router;