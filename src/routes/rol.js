const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/rol', (req, res) => {
    console.log('get rol')
    mysqlConnection.query('Select * from rol', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
router.get('/rol/:id', (req, res) => {
    console.log('get rol')
    mysqlConnection.query('Select descripción where rol.id_rol = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/rol', (req, res) => {
    let usu = req.body;
    console.log('insert rol')
    mysqlConnection.query('insert into rol (descripción) values (?)',
        [usu.descripción], (err, result) => {
            if (!err) {
                res.send('Creado');
            } else {
                console.log(err);
                res.send('Error');
            }
        })
});

//Actualizar
router.put("/rol/:id", (req, res) => {
    console.log("update rol");
    let usu = req.body;
    console.log(usu);
    mysqlConnection.query('update rol set descripción = ? where id_rol = ?',
        [usu.descripción, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Eliminar
router.delete("/rol/:id", (req, res) => {
    console.log("update rol ");
    mysqlConnection.query('delete from rol where rol.id_rol = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Eliminado");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});


module.exports = router;