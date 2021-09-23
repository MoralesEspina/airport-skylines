const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


router.get("/", (req, res) => {
    res.send('Hola Como Estan');
});

module.exports = router;