const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*CRUD*/
router.get('/boleto',(req,res)=>{
    console.log('get lista boleto')
    mysqlConnection.query('Select * from boleto',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Get-id*/
router.get('/boleto/:id_boleto',(req,res)=>{
    console.log('get modelo')
    mysqlConnection.query('Select * from modelo where id_boleto = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Insert*/
router.post('/boleto',(req,res)=>{
    console.log('Insert boleto')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into boleto (fecha_compra, id_pasajero, id_vuelo, clase, num_asiento, estado.) values (?,?,?,?)',
    [emp.fecha_compra,emp.id_pasajero,emp.id_vuelo,emp.clase,emp.num_asiento,emp.estado],(err,result)=>{
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
router.put('/boleto/:id_boleto',(req,res)=>{
    console.log('Update boleto')
    let emp=req.body;
    mysqlConnection.query('update boleto set fecha_compra=?, id_pasajero=?, id_buelo=?, clase=?, num_asiento=?, estado=? where id_modelo=?',
    [emp.fecha_compra,emp.id_pasajero,emp.id_vuelo,emp.clase,emp.num_asiento,emp.estado],(err,result)=>{
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
router.delete('/boleto/:id_boleto',(req,res)=>{
    console.log('Delete boleto')
    mysqlConnection.query('delete from boleto where id_boleto = ?',[req.params.id],(err,result)=>{
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