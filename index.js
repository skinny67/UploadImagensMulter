const express = require('express');
const app = express();

app.get('/', ()=>{
    console.log('Realizando o acesso ao servidor!')
})

app.listen(3000, ()=>{
    console.log('Sistma ON!')
})