const {request,response} = require('express');
const {connection} = require('../database/db');

const getUser = async (req=request, res=response) =>{
    try {
        const [row,fields] = await connection.execute('SELECT * FROM users');
        res.status(200).json({users: row})
    } catch (error) {
        res.status(500).json({users: false});
    }
    finally{
        connection.releaseConnection()
    }
}

const postUser = async (req=request, res=response) => {
    const {user,id} = req.body;

    try {
        const [row,fields] = (await connection.execute(`INSERT INTO users(user,id) VALUES(?,?)`,[user,id]))
        res.status(200).json({added: true})    
    } catch (error) {
        res.status(500).json({added: false})
    }finally{
        connection.releaseConnection();
    }
    /*await connection.query(`INSERT INTO users(user,id) VALUES(${JSON.stringify(user)},${id})`,(err,result)=>{
        if(err){
            res.status(500).json({added: false});
            return;
        }
        res.status(200).json({added: true});
    })*/
}


const putUser = async (req=request, res=response) => {
    const {id} = req.params;
    const {user} = req.body;
    
    try {
        const [row,fields] = (await connection.execute(`UPDATE users set user = ? WHERE id = ?`,[JSON.stringify(user),id]))
        res.status(200).json({updated:true})    
    } catch (error) {
        res.status(500).json({updated: false})
    } finally{
        connection.releaseConnection();
    }
    /*await connection.query(`UPDATE users set user = ${JSON.stringify(user)} WHERE id = ${id}`,(err,result)=>{
        if(err){
            res.status(500).json({updated: false});
            return;
        }
        res.status(200).json({updated: true});
    })*/
}

module.exports = {
    getUser,
    postUser,
    putUser
}