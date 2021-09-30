const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/clase RR
router.post("/clase", (req, res) => {
    console.log("Create clase ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into clase (id_clase, tipo_clase, precio) values (?,?,?)',
        [est.id_clase, est.tipo_clase, est.precio], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//GET:/clase RR
router.get("/clase", (req, res) => {
    console.log("get list of clase");
    mysqlConnection.query('Select * from clase', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/clase/:id RR
router.get("/clase/:id_clase", (req, res) => {
    console.log("get clase");
    mysqlConnection.query('Select * from clase where id_clase = ?', [req.params.id_clase], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/clase/:id RR
router.put("/clase/:id_clase", (req, res) => {
    console.log("update clase ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update clase set tipo_clase = ?, precio = ? where id_clase = ?',
        [est.tipo_clase, est.precio, req.params.id_clase], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//DELETE:/clase/id RR
router.delete("/clase/:id_clase", (req, res) => {
    console.log("delete clase ");
    mysqlConnection.query('delete from clase where id_clase = ?',
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