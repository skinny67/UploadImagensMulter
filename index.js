require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const Usuario = require('./models/usuario');
const upload = require('./config/configMulter');

// Conexão com o banco de dados e porta da aplicação
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
// FIM Conexão com o banco de dados e porta da aplicação


// Configurações da aplicação
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//FIM Configurações da aplicação

//Rotas Da aplicação

// Rota Inicial
app.get('/', (req, res)=>{
    Usuario.find({}).exec((err, docs)=>{
        res.render('index.ejs',{ Usuarios:docs})
    })
});
// FIM Rota Inicial


// Botão de pesquisa
app.post('/', (req, res)=>{
    Usuario.find({nome: new RegExp(req.body.txtPesquisa,'gi')}).exec((err, docs)=>{
        res.render('index.ejs',{Usuario:docs})
    });
});
// FIM Botão de pesquisa


// Rota de adicionar
app.get('/add', (req, res)=>{
    res.render('adiciona.ejs')
});

app.post('/add',upload.single("txtFoto"), (req, res)=>{
    var usuario = new Usuario({
        nome:req.body.txtNome,
        email:req.body.txtEmail,
        senha:req.body.txtSenha,
        foto:req.file.filename
    });
    usuario.save((err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/');
        }
    });
});
//FIM Rota de adicionar

// Rota delete
app.get('/del/:id', (req, res)=>{
    Usuario.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    })
});
// FIM Rota delete

// Rota editar
app.get('/edit/:id', (req, res)=>{
    Usuario.findById(req.params.id,(err, docs)=>{
        if(err){
            console.log(err)
        }else{
            res.render('edita.ejs',{Usuario: docs})
        }
    })
});

app.post('/edit/:id',upload.single("txtFoto"), (req, res)=>{
    Usuario.findByIdAndUpdate(req.params.id,{ 
        nome:req.body.txtNome,
        email:req.body.txtEmail,
        senha:req.body.txtSenha,
        foto:req.file.fieldname
    },(err, docs)=>{
        res.redirect('/')
    }
    )
});
//FIM Rota editar