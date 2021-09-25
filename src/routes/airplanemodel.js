const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

/*CRUD-Get*/
router.get('/model',(req,res)=>{
    console.log('get lista airplanemodel')
    mysqlConnection.query('Select * from airplanemodel',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Get-id*/
router.get('/model/:model',(req,res)=>{
    console.log('get airplanemodel')
    mysqlConnection.query('Select * from airplanemodel where model = ?',[req.params.model],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Insert*/
router.post('/model',(req,res)=>{
    console.log('Insert airplanemodel')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into airplanemodel (model, cruisingspeed, economicseats, businessseats) values (?,?,?,?)',
    [emp.Model,emp.Cruisingspeed,emp.Economicseats,emp.Businessseats],(err,result)=>{
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
router.put('/model/:model',(req,res)=>{
    console.log('Update airplanemodel')
    let emp=req.body;
    mysqlConnection.query('update airplanemodel set cruisingspeed=?, economicseats=?, businessseats=? where model=?',
    [emp.Cruisingspeed,emp.Economicseats,emp.Businessseats,req.params.model],(err,result)=>{
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
router.delete('/model/:model',(req,res)=>{
    console.log('Delete estudiante')
    mysqlConnection.query('delete from airplanemodel where model = ?',[req.params.model],(err,result)=>{
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