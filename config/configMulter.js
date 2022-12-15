const multer = require('multer');
var storage = multer.diskStorage({
    filename: (req,file,cb)=>{
        let nome = Date.now()+"-"+file.originalname
        cb(null,nome)
    },
    destination:(req,file,cb)=>{
        let path = "./public/fotos"
        cb(null,path)
    }
});

var upload = multer({storage});

module.exports = upload;