const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Ingreso de boleto
router.post("/boleto", (req, res) => {
    console.log("Crear boleto ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into boleto (id_boleto, fecha_compra, id_pasajero, id_vuelo, clase, num_asiento, estado ) values (?,?,?,?,?,?,?)',
        [est.id_boleto, est.fecha_compra, est.id_pasajero, est.id_vuelo, est.clase, est.num_asiento, est.estado], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("Creado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Obtener tabla de boleto
router.get("/boleto", (req, res) => {
    console.log("obtener tabla de boleto");
    mysqlConnection.query('Select * from boleto', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener boleto por id
router.get("/boleto/:id_boleto", (req, res) => {
    console.log("obtener boleto");
    mysqlConnection.query('Select * from boleto where id_boleto = ?', [req.params.id_boleto], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizacón de boleto
router.put("/boleto/:id_boleto", (req, res) => {
    console.log("actualizacón de boleto ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update boleto set fecha_compra = ?, id_pasajero = ?, id_vuelo= ?, clase= ?, num_asiento= ?, estado= ? where id_boleto = ?',
        [est.fecha_compra, est.id_pasajero, est.id_vuelo, est.clase, est.num_asiento, est.estado, req.params.id_boleto], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Borrar boleto
router.delete("/boleto/:id_boleto", (req, res) => {
    console.log("borrar boleto");
    mysqlConnection.query('delete from boleto where id_boleto = ?',
        [req.params.id_boleto], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Borrado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;