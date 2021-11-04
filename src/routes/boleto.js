const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const mysqlConnection = require('../configurations/db-conf');

//create de boleto
router.post("/boletos", [check('fecha_compra', 'es requerido').notEmpty().isDate().withMessage('Ingrese una fecha valida formato YYYY/MM/DD'),
check('id_pasajero', 'es requerido').notEmpty().isInt().withMessage('solo números'), check('id_vuelo', 'es requerido').notEmpty().isInt().withMessage('solo números'),
check('clase', 'es requerido').notEmpty().isInt().withMessage('solo números'), check('num_asiento', 'es requerido').notEmpty().isInt().withMessage('solo números'),
check('estado', 'es requerido').notEmpty().isInt().withMessage('solo números')], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        let est = req.body;
        console.log(est);
        mysqlConnection.query('insert into boleto (fecha_compra, id_pasajero, id_vuelo, clase, num_asiento, estado ) values (?,?,?,?,?,?,?)',
            [est.fecha_compra, est.id_pasajero, est.id_vuelo, est.clase, est.num_asiento, est.estado], (err, result) => {
                if (!err) {
                    console.log(result);

                    res.status(201).send("Boleto Creado Correctamente");
                } else {
                    console.log(err);
                    res.send('error' + err);
                }
                       
            }
        );
    }
});

//Obtener tabla de boleto
router.get("/boletos", (req, res) => {
    console.log("Obteniendo Lista Boleto");
    mysqlConnection.query('select b.id_boleto, b.fecha_compra, r.nombres, r.apellidos, b.id_vuelo, c.tipo_clase, c.precio, a.numero, a.letra, e.descripcion from zint4hwvvzk5xj98.boleto b join zint4hwvvzk5xj98.pasajero p on b.id_pasajero= p.id_pasajero join zint4hwvvzk5xj98.persona r on p.id_persona = r.id_persona join zint4hwvvzk5xj98.clase c on b.clase= c.id_clase join zint4hwvvzk5xj98.asiento a on b.num_asiento= a.id_asiento join zint4hwvvzk5xj98.estado_boleto e on b.estado= e.idestado_boleto;', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener boleto por id
router.get("/boletos/:id_boleto", (req, res) => {
    console.log("Obteniendo Boleto");
    mysqlConnection.query('select b.id_boleto, b.fecha_compra, r.nombres, r.apellidos, b.id_vuelo, c.tipo_clase, c.precio, a.numero, a.letra, e.descripcion from zint4hwvvzk5xj98.boleto b join zint4hwvvzk5xj98.pasajero p on b.id_pasajero= p.id_pasajero join zint4hwvvzk5xj98.persona r on p.id_persona = r.id_persona join zint4hwvvzk5xj98.clase c on b.clase= c.id_clase join zint4hwvvzk5xj98.asiento a on b.num_asiento= a.id_asiento join zint4hwvvzk5xj98.estado_boleto e on b.estado= e.idestado_boleto where id_boleto = ?', [req.params.id_boleto], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizacón de boleto
router.put("/boletos/:id_boleto",  [check('fecha_compra', 'es requerido').notEmpty().isDate().withMessage('Ingrese una fecha valida formato YYYY/MM/DD'),
check('id_pasajero', 'es requerido').notEmpty().isInt().withMessage('solo números'), check('id_vuelo', 'es requerido').notEmpty().isInt().withMessage('solo números'),
check('clase', 'es requerido').notEmpty().isInt().withMessage('solo números'), check('num_asiento', 'es requerido').notEmpty().isInt().withMessage('solo números'),
check('estado', 'es requerido').notEmpty().isInt().withMessage('solo números')], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        console.log("Actualizando Boleto");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update boleto set fecha_compra = ?, id_pasajero = ?, id_vuelo= ?, clase= ?, num_asiento= ?, estado= ? where id_boleto = ?',
        [est.fecha_compra, est.id_pasajero, est.id_vuelo, est.clase, est.num_asiento, est.estado, req.params.id_boleto], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send(" Boleto Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });

    }
    
});

//Borrar boleto
router.delete("/boletos/:id_boleto", (req, res) => {
    console.log("Borrando Boleto");
    mysqlConnection.query('delete from boleto where id_boleto = ?',
        [req.params.id_boleto], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("Boleto Borrado Correctamenta");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;