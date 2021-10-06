const express = require('express')

const app = express()
//const port = 3000

const mysql  = require('mysql');

// Permitir que o server trabalhe com JSON
app.use(express.json());

server.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", "*");
    server.use(cors());
    next();
});

// Carregar informações de conexão
require('dotenv-safe').config();

const connection = mysql.createConnection({
  host     : process.env.DBHOST,
  port     : process.env.DBPORT,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBDATABASE
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//GET  
app.get('/api/produtos',function(req,res){  
    var qry = "select * from PRODUTOS";  
    connection.query(qry,function(err,rows){  
        if(err)  
            throw err;  
        console.log(rows);  
        res.json(rows);  
    });  
})

//POST  
app.post('/api/produtos', function(req,res){  
    var qry = "insert into PRODUTOS values(DEFAULT, '"+req.body.Nome+"',"+req.body.Preco+",NOW())";  
    
    connection.query(qry,function(err,rows){  
        if(err)  
            throw err;  
        console.log("Registro inserido com sucesso");  
        res.send("Registro inserido com sucesso")  
    });  
})

// var port = process.env.port||3000
 
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

port = process.env.PORT || 3000;

app.listen(port);
console.log('Rodando servico: ' + port);