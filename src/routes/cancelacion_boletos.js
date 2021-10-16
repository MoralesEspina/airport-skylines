const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Visualizar cancelacion_boletos
router.get("/cancelacion_boletos", (req, res) => {
    console.log("Obteniendo cancelacion_boletos");
    mysqlConnection.query('Select * from cancelacion_boletos', (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    });
});


//Ver cancelacion_boletos
router.get("/cancelacion_boletos/:id", (req, res) => {
    console.log("Obteniendo cancelacion_boletos");
    mysqlConnection.query('Select * from boletos where id_cancelacion_boletos = ?', [req.params.id], (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    });
});

//Crear cancelacion_boletos
router.post("/cancelacion_boletos", (req, res) => {
    console.log("Creando cancelacion_boletos");
    let route = req.body;

    mysqlConnection.query('insert into cancelacion_boletos (id_cancelacion_boletos, id_boleto, motivo, estado) values (?,?,?,?)',
        [route.id_cancelacion_boletos, route.id_boleto, route.motivo, route.estado], (err, result) => {
            if(!err){
                console.log(result);
                res.status(201).send("Creado Correctamente");
            }else{
                console.log(err);
                res.send('Error'+err);
            }
        });
});

//Actualizar cancelacion_boletos
router.put("/cancelacion_boletos/:id", (req, res) => {
    console.log("Actualizando cancelacion_boletos");
    let route = req.body;

    mysqlConnection.query('update cancelacion_boletos set  id_boleto = ?, motivo = ?, estado = ? where id_cancelacion_boletos = ?',
        [route.id_boleto, route.motivo, route.estado,req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar cancelacio_boletos
router.delete("/cancelacion_boletos/:id", (req, res) => {
    console.log("Eliminando cancelacion_boletos ");
    mysqlConnection.query('delete from cancelacion_boletos where id_cancelacion_boletos = ?',
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