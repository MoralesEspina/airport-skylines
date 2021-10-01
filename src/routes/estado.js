const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/
router.post("/estado", (req, res) => {
    console.log("Create estado ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into estado (id_estado_cancelacion, descripccion) values (?,?,?)',
        [est.id_estado_cancelacion, est.descripccion], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//GET:/
router.get("/estado", (req, res) => {
    console.log("get list of estado");
    mysqlConnection.query('Select * from estado', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/
router.get("/estado/:id_estado_cancelacion", (req, res) => {
    console.log("get clase");
    mysqlConnection.query('Select * from clase where id_estado_cancelacion = ?', [req.params.id_estado_cancelacion], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/
       router.put("/estado/:id_estado_cancelacion", (req, res) => {
    console.log("update estado ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estado set descripccion = ?,  where id_estado_cancelacion = ?',
        [est.descripccion, est.id_estado_cancelacion], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//DELETE:/
             router.delete("/estado/:id_estado_cancelacion", (req, res) => {
        console.log("delete estado ");
          mysqlConnection.query('delete from estado where id_estado_cancelacion = ?',
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

