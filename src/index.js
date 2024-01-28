const express = require('express');
const app = express();
const port = 8000; // Escolha a porta que desejar

app.get('/', (req, res) => {
    res.send('Bem-vindo ao backend com Express!');
});

app.listen(port, () => {
    console.log(`Servidor está ouvindo na porta ${port}`);
});