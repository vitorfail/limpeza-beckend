const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); 
const md5 = require("md5");
const jwt = require("jsonwebtoken")
const check = require('../checkUser');

const rota = express.Router()

async function pesquisa(id, valor, op){
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
        if(op === "nome"){
            const resultados = await pool.query("SELECT nome, email, telefone FROM Clientes WHERE id_empresa= "+id+" AND nome ILIKE  '%"+ valor+"%'");
            if(resultados.rows.length >0){
                return {status:"ok", result:resultados.rows}
            }
            else{
                return {status:"ok", result:[]}
            }
        }
        if(op == "numero"){
            const resultados = await pool.query("SELECT nome, email, telefone FROM Clientes WHERE id_empresa= "+id+" AND telefone ILIKE  '%"+ valor+"%'");
            if(resultados.rows.length >0){
                return {status:"ok", result:resultados.rows}
            }
            else{
                return {status:"ok", result:[]}
            }
        }
        if(op == "telefone"){
            const resultados = await pool.query("SELECT nome, email, telefone FROM Clientes WHERE id_empresa= "+id+" AND email ILIKE '%"+ valor+"%'");
            if(resultados.rows.length >0){
                return {status:"ok", result:resultados.rows}
            }
            else{
                return {status:"ok", result:[]}
            }
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
            var result = await pesquisa(decode.payload.id, req.body.valor, req.body.op)
            res.status(200).send({result:result})
        }     
    }
    catch(error){
        res.status(500).send({result:error})
    }
})
module.exports = rota