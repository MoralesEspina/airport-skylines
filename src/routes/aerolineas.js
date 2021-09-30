const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*CRUD-Get*/
router.get('/aerolineas',(req,res)=>{
    console.log('Get Lista Aerolineas')
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
    console.log('Get Aerolineas')
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
    console.log('Insert Aerolineas')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into aerolinea (nombre) values (?)',
    [emp.nombre],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Update*/
router.put('/aerolinea/:id',(req,res)=>{
    console.log('Update aerolinea')
    let emp=req.body;
    mysqlConnection.query('update aerolinea set nombre=? where id_aerolinea=?',
    [emp.nombre,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Delete*/
router.delete('/aerolinea/:id',(req,res)=>{
    console.log('Delete Aerolinea')
    mysqlConnection.query('delete from aerolinea where id_aerolinea = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

module.exports = router;