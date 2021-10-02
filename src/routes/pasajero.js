const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/pasajero RR
router.post("/pasajero", (req, res) => {
    console.log("Create pasajero ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into pasajero (id_pasajero, id_persona, fecha_nacimiento, genero, nacionalidad ) values (?,?,?,?,?)',
        [est.id_pasajero, est.id_persona, est.fecha_nacimiento, est.genero, est.nacionalidad], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//GET:/pasajero RR
router.get("/pasajero", (req, res) => {
    console.log("get list of pasajero");
    mysqlConnection.query('Select * from pasajero', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/pasajero/:id RR
router.get("/pasajero/:id_pasajero", (req, res) => {
    console.log("get pasajero");
    mysqlConnection.query('Select * from pasajero where id_pasajero = ?', [req.params.id_pasajero], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/pasajero/:id RR
router.put("/pasajero/:id_pasajero", (req, res) => {
    console.log("update pasajero ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update pasajero set id_persona = ?, fecha_nacimiento = ?, genero = ?, nacionalidad = ? where id_pasajero = ?',
        [est.id_persona, est.fecha_nacimiento, est.genero, est.nacionalidad, req.params.id_pasajero], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//DELETE:/pasajero/id RR
router.delete("/pasajero/:id_pasajero", (req, res) => {
    console.log("delete pasajero ");
    mysqlConnection.query('delete from pasajero where id_pasajero = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("deleted");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;