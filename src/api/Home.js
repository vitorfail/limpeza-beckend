const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); 
const md5 = require("md5");
const jwt = require("jsonwebtoken")
const check = require('../checkUser');

const rota = express.Router()

async function home(id){
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
        const resultados = await pool.query("SELECT * FROM Clientes WHERE id_empresa= "+id+"");
        const resultados_pos = await pool.query("SELECT MIN(pos_x) AS menor_x, MAX(pos_x) AS maior_x, MIN(pos_y) AS menor_y, MAX(pos_y) AS maior_y FROM Clientes WHERE id_empresa= "+id);
        if(resultados.rows.length >0){

            var pontos = []
            for(var i =0; i<resultados.rows.length;i++){
                var p = {
                    x:resultados.rows[i].pos_x,
                    y:resultados.rows[i].pos_y
                }
                pontos.push(p)
            }
            return {status:"ok", result:{
                total:resultados.rows.length, 
                cliente_prox:"Nenhum", 
                cliente_long:"Nenhum", 
                pontos:pontos,
                x1:resultados_pos.rows[0].menor_x,
                x2:resultados_pos.rows[0].maior_x,
                y1:resultados_pos.rows[0].menor_y,
                y2:resultados_pos.rows[0].maior_y
            }} 
        }
        else{
            return {status:"ok", result:{total:0, cliente_prox:"Nenhum", cliente_long:"Nenhum", pontos:[{x:0, y:0}], x1:0, x2:0, y1:0, y2:0}}
        }
    } catch (err) {
        return {status:0, error:err}
    }
}


rota.post('/',async (req, res)=>{
    try{
        if(check(req)){
            var h = req.headers.authorization.replace('Bearer ', '')
            var decode = jwt.decode(h)
            var result = await home(decode.payload.id)
            res.status(200).send({result:result})
        }     
    }
    catch(error){
        res.status(500).send({result:error})
    }
})
module.exports = rota