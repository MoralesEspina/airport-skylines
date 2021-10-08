const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/roles', (req, res) => {
    console.log('Obteniendo lisa de roles')
    mysqlConnection.query('Select * from rol', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
router.get('/roles/:id', (req, res) => {
    console.log('Obteniendo rol')
    mysqlConnection.query('Select descripción where rol.id_rol = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/roles', (req, res) => {
    let usu = req.body;
    console.log('Creando rol')
    mysqlConnection.query('insert into rol (descripción) values (?)',
        [usu.descripción], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

//Actualizar
router.put("/roles/:id", (req, res) => {
    console.log("Actualizando rol");
    let usu = req.body;
    console.log(usu);
    mysqlConnection.query('update rol set descripción = ? where id_rol = ?',
        [usu.descripción, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar
router.delete("/roles/:id", (req, res) => {
    console.log("Eliminando rol ");
    mysqlConnection.query('delete from rol where rol.id_rol = ?',
        [req.params.id], (err, result) => {
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