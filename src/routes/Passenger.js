const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/tripulacion RR
router.post("/passenger", (req, res) => {
    console.log("Create passenger ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into passenger (id, identitycard, firstname, lastname, age, gender, nacionality) values (?,?,?,?,?,?,?)',
        [est.id, est.identitycard, est.firstname, est.lastname, est.age, est.gender ,est.nacionality], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//GET:/tripulacion RR
router.get("/passenger", (req, res) => {
    console.log("get list of employees");
    mysqlConnection.query('Select * from passenger', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/tripulacion/:id RR
router.get("/passenger/:id", (req, res) => {
    console.log("get passenger");
    mysqlConnection.query('Select * from passenger where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/tripulacion/:id RR
router.put("/passenger/:id", (req, res) => {
    console.log("update passenger ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update passenger set identitycard = ?, firstname = ?, lastname = ?, age = ?, gender = ?, nacionality = ? where id = ?',
        [est.identitycard, est.firstname, est.lastname, est.age, est.gender ,est.nacionality, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//DELETE:/tripulacion/id RR
router.delete("/passenger/:id", (req, res) => {
    console.log("delete passenger ");
    mysqlConnection.query('delete from passenger where id = ?',
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