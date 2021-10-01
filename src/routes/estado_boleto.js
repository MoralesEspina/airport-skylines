const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


router.get("/", (req, res) => {
    res.send('Hola Como Estan');
});

//lista estado_boleto
router.get('/estado_boleto', (req, res) => {
    console.log('get lista estado_boleto');
    mysqlConnection.query('select * from estado_boleto', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

// lista ID estado_boleto
router.get('/estado_boleto/:id',(req, res)=>{
    console.log('get estado_boleto');
    mysqlConnection.query('select * from estado_boleto where idestado_boleto=?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});
// crear estado_boleto
router.post('/estado_boleto',(req, res)=>{
    console.log('crear estado_boleto');
    let est= req.body;
    mysqlConnection.query('insert into estado_boleto (idestado_boleto, descripción) values (?,?)',[est.idestado_boleto, est.descripción],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(201).send('Creado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });

});
//actualizar estado_boleto
app.put('/estado_boleto/:id',(req, res)=>{
    console.log('actualizar estado_boleto');
    let est= req.body;
    console.log(est);
    mysqlConnection.query('update estado_boleto set idestado_boleto=?, descripcion=? where id=?',[est.idestado_boleto, est.descripción, req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Actualizado Correctamente');
        }
        else{
            console.log(err);
            res.send('error' + err);
        }
    });

});
//eliminar estado_boleto
router.delete('/estado_boleto/:id',(req, res)=>{
    console.log('delete estado_boleto');
    mysqlConnection.query('delete from estado_boleto where idestado_boleto=?',[req.params.id],(err, result)=>{
        if(!err){
            console.log(result);
            res.status(202).send('Eliminado Correctamente');
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});
module.exports = router;
