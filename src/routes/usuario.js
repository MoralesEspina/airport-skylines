const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/usuario', (req, res) => {
    console.log('get usuario')
    mysqlConnection.query('Select * from usuario', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
router.get('/usuario/:id', (req, res) => {
    console.log('get usuario')
    mysqlConnection.query('Select id_persona, rol, correo, contraseña, fechaCreacion where usuario.id_usuario = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/usuario', (req, res) => {
    let usu = req.body;
    console.log('insert usuario')
    mysqlConnection.query('insert into usuario (id_persona, rol, correo, contraseña, fechaCreacion) values (?,?,?,?,?)',
        [usu.id_persona, usu.rol, usu.correo, usu.contraseña, usu.fechaCreacion], (err, result) => {
            if (!err) {
                res.send('Creado');
            } else {
                console.log(err);
                res.send('Error');
            }
        })
});

//Actualizar
router.put("/usuario/:id", (req, res) => {
    console.log("update usuario");
    let usu = req.body;
    console.log(usu);
    mysqlConnection.query('update usuario set id_persona = ?, rol = ?, correo = ?, contraseña = ?, fechaCreacion = ? where id_usuario = ?',
        [usu.id_persona, usu.rol, usu.correo, usu.contraseña, usu.fechaCreacion, req.params.id], (err, result) => {
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
router.delete("/usuario/:id", (req, res) => {
    console.log("update usuario ");
    mysqlConnection.query('delete from usuario where usuario.id_usuario = ?',
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