const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); 
const md5 = require("md5")

const rota = express.Router()

async function register( user, senha){
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
    console.log(user + '    '+senha)
    try {
        const f = 'df'
        const resultados = await pool.query("SELECT id FROM Usuarios WHERE usuario= '"+ user.toString()+"' AND senha = '"+md5(senha.toString())+"' ");
        if(resultados.rows.length == 0){
            const result = await pool.query("INSERT INTO Usuarios(usuario, senha) VALUES ('"+user.toString()+"', '"+md5(senha.toString())+"') RETURNING id")
            return {status:"ok"}
        }
        else{
            return {status:"EXIST"}
        }
    } catch (error) {
        return {status:0, error:'Erro na consulta ao banco de dados:'+ error}
    }
}

rota.post('/',async (req, res)=>{
    try{
        var result = await register(req.body.user,req.body.senha)
        res.status(200).send({result:result})     
    }
    catch{
        res.status(500).send({result:error})
    }
})
module.exports = rota