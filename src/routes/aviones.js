const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*CRUD-Get*/
router.get('/aviones',(req,res)=>{
    console.log('Get Lista Aviones')
    mysqlConnection.query('select v.id_avion, e.descripcion estado, m.nombre modelo, a.nombre aerolinea from zint4hwvvzk5xj98.avion v join zint4hwvvzk5xj98.estado_avion e on v.estado=e.id_estado_avion join zint4hwvvzk5xj98.modelo m on v.modelo=m.id_modelo join zint4hwvvzk5xj98.aerolinea a on v.aerolinea=a.id_aerolinea order by id_avion asc;',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Get-id*/
router.get('/aviones/:id',(req,res)=>{
    console.log('get aviones')
    mysqlConnection.query('select v.id_avion, e.descripcion estado, m.nombre modelo, a.nombre aerolinea from zint4hwvvzk5xj98.avion v join zint4hwvvzk5xj98.estado_avion e on v.estado=e.id_estado_avion join zint4hwvvzk5xj98.modelo m on v.modelo=m.id_modelo join zint4hwvvzk5xj98.aerolinea a on v.aerolinea=a.id_aerolinea where v.id_avion = ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Insert*/
router.post('/aviones',(req,res)=>{
    console.log('Insert aviones')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into avion (estado, modelo, aerolinea) values (?,?,?)',
    [emp.estado,emp.modelo,emp.aerolinea],(err,result)=>{
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
router.put('/aviones/:id',(req,res)=>{
    console.log('Update aviones')
    let emp=req.body;
    mysqlConnection.query('update avion set estado=?, modelo=?, aerolinea=? where id_avion=?',
    [emp.estado,emp.modelo,emp.aerolinea,req.params.id],(err,result)=>{
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
router.delete('/aviones/:id',(req,res)=>{
    console.log('Delete Aviones')
    mysqlConnection.query('delete from avion where id_avion = ?',[req.params.id],(err,result)=>{
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