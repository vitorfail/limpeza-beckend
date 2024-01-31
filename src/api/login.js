const express = require('express');
const { Pool } = require('pg');
const jwt = require("jsonwebtoken");
require('dotenv').config(); 
const md5 = require("md5")

const rota2 = express.Router()

async function login( user, senha){
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
        const resultados = await pool.query("SELECT id FROM Usuarios WHERE usuario = '"+user.toString()+"' AND senha = '"+md5(senha.toString())+"'");
        var token = jwt.sign({payload: { id:resultados.rows[0].id}}, process.env.PRIVATE_KEY)
        return {status:"ok", token:token}
    } catch (error) {
        return {status:0, error:error}
    }
}


rota2.post('/',async (req, res)=>{
    try{
        var result = await login(req.body.user,req.body.senha)
        res.status(200).send({result:result})     
    }
    catch{
        res.status(500).send({result:error})
    }
})
module.exports = rota2