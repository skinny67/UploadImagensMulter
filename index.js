require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const Usuario = require('./models/usuario');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.CONNECTIONSTRING,
    {   
        // useNewUrlParser: true, 
        // useUnifiedTopology: true,
        // useFindAndModify: false
     })
    .then(()=>{
        console.log('Conectei á base de dados.')
        app.emit('PRONTO');
    })
    .catch(e => console.log(e));

app.on('PRONTO', ()=> {
    app.listen(3000, ()=>{
        console.log('Servidor ON!');
        console.log('Acessar http://localhost:3000');
    });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('index.ejs',{})
});

// app.get('/usuarios', (req, res)=>{
//     res.render('usuarios.ejs',{ usuarios:[
//         {nome:'Pablo',email:'pablo@email.com'},
//         {nome:'Pablo',email:'pablo@email.com'},
//         {nome:'Pablo',email:'pablo@email.com'},
//         {nome:'Pablo',email:'pablo@email.com'},
//     ]});
// });

app.get('/add', (req, res)=>{
    res.render('adiciona.ejs')
});

app.post('/add', (req, res)=>{
    var usuario = new Usuario({
        nome:req.body.txtNome,
        email:req.body.txtEmail,
        senha:req.body.txtSenha,
        foto:req.body.txtFoto
    });
    usuario.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/');
        }
    });
});
