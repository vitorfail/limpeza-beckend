const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); 
const md5 = require("md5");
const jwt = require("jsonwebtoken")
const check = require('../checkUser');

const rota = express.Router()

async function home(id){
    console.log(id)
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
        const resultados = await pool.query("SELECT * FROM Clientes WHERE id_empresa= '"+id+"'");
        if(resultados.rows >0){
            var pontos = []
            for(var i =0; 1<resultados.rows.length;i++){
                var p = {
                    x:resultados.rows[i].pos_x,
                    y:resultados.rows[i].pos_y
                }
                pontos.push(p)
            } 
        }
        else{
            return {status:"ok", result:{total:0, cliente_prox:"Nenhum", cliente_long:"Nenhum", pontos:[{x:0, y:0}]}}
        }
        return {status:"ok", result:resultados}
    } catch (err) {
        return {status:0, error:err}
    }
}


rota.post('/',async (req, res)=>{
    try{
        if(check(req)){
            var h = req.headers.authorization.replace('Bearer ', '')
            var decode = jwt.decode(h)
            console.log(decode)
            var result = await home(decode.payload.id)
            res.status(200).send({result:result})
        }     
    }
    catch(error){
        res.status(500).send({result:error})
    }
})
module.exports = rota