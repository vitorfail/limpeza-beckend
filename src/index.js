const express = require('express');
const app = express();
const port = 8000; // Escolha a porta que desejar
const {Usuario} = require("./database")
app.get('/', (req, res) => {
    res.send('Bem-vindo ao backend com Express!');
});
async function inicio(){
    await Usuario.sync()
}
inicio()
var cors = require('cors')
app.use(cors())
app.use(express.json({limit: '534kb', extended: false }));
app.use(express.urlencoded({limit: '534kb', extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});