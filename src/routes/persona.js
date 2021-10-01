const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/persona', (req, res) => {
    console.log('get persona')
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
router.get('/persona/:id', (req, res) => {
    console.log('get persona')
    mysqlConnection.query('Select nombres, apellidos, tipo_doc, número_doc where persona.id_persona = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/persona', (req, res) => {
    let per = req.body;
    console.log('insert persona')
    mysqlConnection.query('insert into persona (nombres, apellidos, tipo_doc, número_doc ) values (?,?,?,?)',
        [per.nombres, per.apellidos, per.tipo_doc, per.número_doc], (err, result) => {
            if (!err) {
                res.send('Creado');
            } else {
                console.log(err);
                res.send('Error');
            }
        })
});

//Actualizar
router.put("/persona/:id", (req, res) => {
    console.log("update persona");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('update persona set nombres = ?, apellidos = ?, tipo_doc = ?, número_doc = ? where id_persona = ?',
        [per.nombres, per.apellidos, per.tipo_doc, per.número_doc, req.params.id], (err, result) => {
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
router.delete("/persona/:id", (req, res) => {
    console.log("update persona ");
    mysqlConnection.query('delete from persona where persona.id_persona = ?',
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