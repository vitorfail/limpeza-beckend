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
        const resultados = await pool.query("SELECT nome, pos_x,  pos_y FROM Clientes WHERE id_empresa= "+id+"");
        if(resultados.rows.length >0 ){
            var distancias = []
            for(var i =0; i < resultados.rows.length;i++ ){
                const x1 = 0;
                const y1 = 0;
                const x2 =resultados.rows[i].pos_x;
                const y2 = resultados.rows[i].pos_y;

// Calculando a distância usando a fórmula da distância Euclidiana
                const distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                distancias.push({nome:resultados.rows[i].nome, dist:distancia})
            }
            function compararPorChave(a, b) {
                return a.dist - b.dist;
            }
            return {status:"ok", result:distancias.sort(compararPorChave)}
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