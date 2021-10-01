const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');


router.get("/", (req, res) => {
    res.send('Hola Como Estan');
});



//lista de estado_vuelo
router.get("/estado_vuelo", (req, res) => {
    console.log("get lista estado de vuelo");
    mysqlConnection.query('select * from estado_vuelo', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});
//Lista estado vuelo por id
router.get("/estado_vuelo/:id",(req, res)=>{
    console.log('get estado vuelo id');
    mysqlConnection.query('select * from estado_vuelo where id_estado =?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
            res.send('error');
        }
    })

});

//crear estado_vuelo
router.post('/estado_vuelo',(req, res)=>{
    console.log('crear estado_vuelo');
    let est= req.body;
    mysqlConnection.query('insert into estado_vuelo (id_estado, descripción) values (?,?)',[est.id_estado, est.descripción],(err, result)=>{
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
//actualizar estado_vuelo
router.put('/estado_vuelo/:id',(req, res)=>{
    console.log('actualizar estado_vuelo');
    let est= req.body;
    console.log(est);
    mysqlConnection.query('update estado_vuelo set descripción=? where id_estado=?',[est.descripción, req.params.id],(err, result)=>{
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
     
//eliminar estado_vuelo
router.delete('/estado_vuelo/:id',(req, res)=>{
    console.log('delete estado_vuelo');
    mysqlConnection.query('delete from estado_vuelo where id_estado=?',[req.params.id],(err, result)=>{
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