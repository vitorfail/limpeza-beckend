const express = require('express');
const { Pool } = require('pg');
const jwt = require("jsonwebtoken");
require('dotenv').config(); 
const md5 = require("md5")

const app = express();
const rota = express.Router()

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
        const resultados = await pool.query('SELECT id FROM Usuario WHERE usuario = '+user+' AND senha = '+senha);
        console(res.json(resultados.rows))
        //var token = jwt.sign({payload: { id_f:funcionario[0].dataValues.id, id_empresa: funcionario[0].dataValues.id_empresa}}, process.env.PRIVATE_KEY)
        //return {status:"ok", token:token}
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
    }
}


rota.post('/',async (req, res)=>{
    try{
        var result = await login(req.body.user,req.body.user)
        res.status(200).send({result:result})     
    }
    catch{
        res.status(500).send({result:error})
    }
})
module.exports = rota