const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); 
const md5 = require("md5")

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
    console.log(user + '    '+senha)
    try {
        const f = 'df'
        const resultados = await pool.query("SELECT * FROM Clientes WHERE id_empresa= '"+id+"' AND nome = '"+nome+"' AND email = '"+email+"'");
        if(resultados.rows.length>0){
            return {status:"EXIST"}
        }
        else{
            const q = "INSER INTO Clientes(id_empresa, nome, email, telefone, pos_x, pos_y) VALUES($1, $2, $3, $4, $5, $6) id_empresa= '"+id+"' AND nome = '"+nome+"' AND email = '"+email+"'"
            const resultados = await pool.query(q, [id, nome, email, telefone,pos_x, pos_y]);
            return {status:"ok"}
        }
        
    } catch (error) {
        return {status:0, error:'Erro na consulta ao banco de dados:'+ error}
    }
}


rota.post('/',async (req, res)=>{
    try{
        if(check(req)){
            var h = req.headers.authorization.replace('Bearer ', '')
            var decode = jwt.decode(h)
            var result = await registro_cliente(req.body.nome, req.body.email, decode.payload.id_empresa)
            res.status(200).send({result:result})
        }     
    }
    catch{
        res.status(500).send({result:error})
    }
})
module.exports = rota