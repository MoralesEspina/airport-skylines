const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*CRUD-Get*/
router.get('/modelos',(req,res)=>{
    console.log('Obteniendo Lista de Modelos')
    mysqlConnection.query('Select * from modelo',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Get-id*/
router.get('/modelos/:id',(req,res)=>{
    console.log('Obteniendo Modelo')
    mysqlConnection.query('Select * from modelo where id_modelo = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Insert*/
router.post('/modelos',(req,res)=>{
    console.log('Creando Modelo')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into modelo (nombre, velocidad_media, asientos_economicos, asientos_ejecutivos) values (?,?,?,?)',
    [emp.nombre,emp.velocidad_media,emp.asientos_economicos,emp.asientos_ejecutivos],(err,result)=>{
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
router.put('/modelos/:id',(req,res)=>{
    console.log('Actualizando Modelo')
    let emp=req.body;
    mysqlConnection.query('update modelo set nombre=?, velocidad_media=?, asientos_economicos=?, asientos_ejecutivos=? where id_modelo=?',
    [emp.nombre,emp.velocidad_media,emp.asientos_economicos,emp.asientos_ejecutivos,req.params.id],(err,result)=>{
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
router.delete('/modelos/:id',(req,res)=>{
    console.log('Eliminando Modelo')
    mysqlConnection.query('delete from modelo where id_modelo = ?',[req.params.id],(err,result)=>{
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