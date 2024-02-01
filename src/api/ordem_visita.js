const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); 
const md5 = require("md5");
const jwt = require("jsonwebtoken")
const check = require('../checkUser');

const rota = express.Router()

async function ordem(id){
    var config = {}
    if(process.env.URL === ""){
        config= {
            user:process.env.USER,
            host:process.env.HOST,
            database:process.env.DATABASE,
            password:process.env.PASSWORD, 
            port:process.env.PORT
        }    
    }
    else{
        config = {
            connectionString: process.env.URL,
        }
    }
    const pool = new Pool(config)
    try {
        const resultados = await pool.query("SELECT nome,distancia as dist FROM Clientes WHERE id_empresa= "+id+" ORDER BY distancia ASC");
        if(resultados.rows.length >0 ){
            return {status:"ok", result:resultados.rows}
        }
        else{
            return {status:"ok", result:[]}
        }
    }
    catch(err) {
        return {status:0, error:err}
    }
}


rota.post('/',async (req, res)=>{
    try{
        if(check(req)){
            var h = req.headers.authorization.replace('Bearer ', '')
            var decode = jwt.decode(h)
            var result = await ordem(decode.payload.id)
            res.status(200).send({result:result})
        }     
    }
    catch(error){
        res.status(500).send({result:error})
    }
})
module.exports = rota