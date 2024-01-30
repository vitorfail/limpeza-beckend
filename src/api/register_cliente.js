const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const check = require("../checkUser") 
const jwt = require("jsonwebtoken")

const rota = express.Router()

async function registro_cliente(id, nome, email, telefone, pos_x, pos_y){
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
        const f = 'df'
        const resultados = await pool.query("SELECT * FROM Clientes WHERE id_empresa= '"+id+"' AND nome = '"+nome+"' AND email = '"+email+"'");
        if(resultados.rows.length>0){
            return {status:"EXIST"}
        }
        else{
            const q = "INSERT INTO Clientes(id_empresa, nome, email, telefone, pos_x, pos_y) VALUES($1, $2, $3, $4, $5, $6) "
            const resultados = await pool.query(q, [id, nome, email, telefone,pos_x, pos_y]);
            return {status:"ok"}
        }
        
    } catch (error) {
        console.log(error)
        return {status:0, error:'Erro na consulta ao banco de dados:'+ error}
    }
}


rota.post('/',async (req, res)=>{
    try{
        if(check(req)){
            var h = req.headers.authorization.replace('Bearer ', '')
            var decode = jwt.decode(h)
            var result = await registro_cliente(decode.payload.id_empresa, req.body.nome, req.body.email, req.body.x,req.body.y)
            res.status(200).send({result:result})
        }     
    }
    catch(error){
        console.log(error)
        res.status(500).send({result:error})
    }
})
module.exports = rota