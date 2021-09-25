const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/flightticket RR
router.post("/flightticket", (req, res) => {
    console.log("Create flightticket ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into flightticket (id, class, saleprice, seat, flight_code, passenger_id) values (?,?,?,?,?,?)',
        [est.id, est.class, est.saleprice, est.seat, est.flight_code, est.passenger_id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("created");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//GET:/flightticket RR
router.get("/flightticket", (req, res) => {
    console.log("get list of flightticket");
    mysqlConnection.query('Select * from flightticket', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//GET:/flightticket/:id RR
router.get("/flightticket/:id", (req, res) => {
    console.log("get flightticket");
    mysqlConnection.query('Select * from flightticket where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//PUT:/flightticket/:id RR
router.put("/flightticket/:id", (req, res) => {
    console.log("update flightticket ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update flightticket set class = ?, saleprice = ?, seat = ?, flight_code = ?, passenger_id = ? where id = ?',
        [est.class, est.saleprice, est.seat, est.flight_code, est.passenger_id, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("updated");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//DELETE:/flightticket/id RR
router.delete("/flightticket/:id", (req, res) => {
    console.log("delete flightticket ");
    mysqlConnection.query('delete from flightticket where id = ?',
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