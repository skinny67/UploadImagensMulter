const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('index.ejs',{})
});

app.get('/usuarios', (req, res)=>{
    res.render('usuarios.ejs',{ usuarios:[
        {nome:'Pablo',email:'pablo@email.com'},
        {nome:'Pablo',email:'pablo@email.com'},
        {nome:'Pablo',email:'pablo@email.com'},
        {nome:'Pablo',email:'pablo@email.com'},
    ]});
});


app.listen(3000, ()=>{
    console.log('Sistma ON!')
})