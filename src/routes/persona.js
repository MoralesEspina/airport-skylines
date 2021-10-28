const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/personas', (req, res) => {
    console.log('Obteniendo Lista de personas')
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer por id
router.get('/personas/:id', (req, res) => {
    console.log('Obteniendo persona')
    mysqlConnection.query('Select * from persona where persona.id_persona = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

/*Leer por nombre
router.get('/personas/:nombres', (req, res) => {
    console.log('get persona')
    mysqlConnection.query('Select * from persona where persona.nombres = ?', [req.params.nombres], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});*/

//Crear
router.post('/personas', (req, res) => {
    let per = req.body;
    console.log('Creando persona')
    mysqlConnection.query('insert into persona (nombres, apellidos, tipo_doc, numero_doc ) values (?,?,?,?)',
        [per.nombres, per.apellidos, per.tipo_doc, per.numero_doc], (err, result) => {
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
router.put("/personas/:id", (req, res) => {
    console.log("Atualizando persona");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('update persona set nombres = ?, apellidos = ?, tipo_doc = ?, numero_doc = ? where id_persona = ?',
        [per.nombres, per.apellidos, per.tipo_doc, per.numero_doc, req.params.id], (err, result) => {
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
router.delete("/personas/:id", (req, res) => {
    console.log("Eliminando persona ");
    mysqlConnection.query('delete from persona where persona.id_persona = ?',
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