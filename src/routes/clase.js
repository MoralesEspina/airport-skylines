const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//POST:/clase validacion
router.post("/clases", [check('tipo_clase', 'es requerido').notEmpty().isString().withMessage('Ingrece tipo de clase'),
check('precio', 'es requerido').notEmpty().isInt().withMessage('Agregar precio en números')], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {

        console.log("Creando clase");
        let est = req.body;
        console.log(est);
        mysqlConnection.query('insert into clase (tipo_clase, precio) values (?,?,?)',
            [est.id_clase, est.tipo_clase, est.precio], (err, result) => {
                if (!err) {
                    console.log(result);

                    res.status(201).send("Creado Correctamente");
                } else {
                    console.log(err);
                    res.send('error' + err);
                }
            }
            );




    }
}
);

//GET:/clase RR
router.get("/clases", (req, res) => {
    console.log("Obteniendo Lista de clase");
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
router.get("/clases/:id_clase", (req, res) => {
    console.log("Obteniendo clase");
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
router.put("/clases/:id_clase", [check('tipo_clase', 'es requerido').notEmpty().isString().withMessage('Ingrece tipo de clase'),
check('precio', 'es requerido').notEmpty().isInt().withMessage('Agregar precio en números')], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {console.log("Actualizando clase ");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update clase set tipo_clase = ?, precio = ? where id_clase = ?',
        [est.tipo_clase, est.precio, req.params.id_clase], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });

    }
    
});

//DELETE:/clase/id RR
router.delete("/clases/:id_clase", (req, res) => {
    console.log("Eliminando clase ");
    mysqlConnection.query('delete from clase where id_clase = ?',
        [req.params.id], (err, result) => {
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