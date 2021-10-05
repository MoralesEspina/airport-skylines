const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*CRUD-Get*/
router.get('/aerolineas',(req,res)=>{
    console.log('Obteniendo Lista de Aerolineas')
    mysqlConnection.query('Select * from aerolinea',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Get-id*/
router.get('/aerolineas/:id',(req,res)=>{
    console.log('Obteniendo Aerolinea')
    mysqlConnection.query('Select * from aerolinea where id_aerolinea = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Insert*/
router.post('/aerolineas',(req,res)=>{
    console.log('Creando Aerolinea')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into aerolinea (nombre) values (?)',
    [emp.nombre],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(201).send("Creado Correctamente");
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Update*/
router.put('/aerolineas/:id',(req,res)=>{
    console.log('Actualizando Aerolinea')
    let emp=req.body;
    mysqlConnection.query('update aerolinea set nombre=? where id_aerolinea=?',
    [emp.nombre,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send("Actualizado Correctamente");
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Delete*/
router.delete('/aerolineas/:id',(req,res)=>{
    console.log('Eliminando Aerolinea')
    mysqlConnection.query('delete from aerolinea where id_aerolinea = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.status(202).send("Eliminado Correctamente");
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;