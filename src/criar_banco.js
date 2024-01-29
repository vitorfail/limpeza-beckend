const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); 

const rota = express.Router()

async function criar(){
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
        const usuario = await pool.query('CREATE TABLE Usuarios ( id SERIAL PRIMARY KEY, usuario VARCHAR(255) UNIQUE NOT NULL, senha VARCHAR(255) NOT NULL)');
        const cliente = await pool.query('CREATE TABLE Clientes ( id SERIAL PRIMARY KEY, id_empresa INTEGER, nome VARCHAR(255), email VARCHAR(255) NOT NULL, pos_x FLOAT, pos_y FLOAT )');
        return {status:"ok"}
    } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
    }
}


rota.post('/',async (req, res)=>{
    try{
        var result = await criar()
        res.status(200).send({result:result})     
    }
    catch{
        res.status(500).send({result:error})
    }
})
module.exports = rota