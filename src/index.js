const express = require("express");
const app = express();
const path = require('path');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Corrigido aqui

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('Está escutando a porta 3000! http://localhost:3000')
})

console.log(`Diretório de trabalho atual: ${process.cwd()}`);