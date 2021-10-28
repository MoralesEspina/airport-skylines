const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/usuarios', (req, res) => {
    console.log('Obteniendo Lista de usuarios')
    mysqlConnection.query('Select * from usuario', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer
router.get('/usuarios/:id', (req, res) => {
    console.log('Obteninendo usuario')
    mysqlConnection.query('Select id_persona, rol, correo, contraseña, fechaCreacion where usuario.id_usuario = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/usuarios', (req, res) => {
    let usu = req.body;
    console.log('Creando usuario')
    mysqlConnection.query('insert into usuario (id_persona, rol, userName, password, fechaCreacion) values (?,?,?,?,CURDATE())',
        [usu.id_persona, usu.rol, usu.userName, usu.password], (err, result) => {
            if (!err) {
                res.send('Creado');
            } else {
                console.log(err);
                res.send('Error');
            }
        })
});

//Actualizar
router.put("/usuarios/:id", (req, res) => {
    console.log("Actualizando usuario");
    let usu = req.body;
    console.log(usu);
    mysqlConnection.query('update usuario set id_persona = ?, rol = ?, userName = ?, password = ?, fechaCreacion = ? where id_usuario = ?',
        [usu.id_persona, usu.rol, usu.correo, usu.userName, usu.password, req.params.id], (err, result) => {
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
router.delete("/usuarios/:id", (req, res) => {
    console.log("Eliminando usuario");
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