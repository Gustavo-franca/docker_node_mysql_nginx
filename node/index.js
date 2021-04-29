const mysql      = require('mysql');
const database = process.env.MYSQL_DATABASE;
var connection = mysql.createPool({
  connectionLimit: 100,

  host     : process.env.DB_HOST,
  port: 3306,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : database
});


const express = require('express');
const port = 3000;
const server = express();

server.get('/',(req,res)=>{
       connection.query(`Select * from modules`,function (error, results, fields){
        if (error){
            if(error.code =="ECONNREFUSED")
                return res.status(503).send({error : "Aguardando Conexão Com Bando de Dados! Tente novamente mais tarde"})
            return res.status(500).send({error: "Erro ao acessar banco de dados!"})
        }
        return res.send(results);
    });
})

server.listen(port, ()=>{
    console.log(`server listening in port ${port}`)
})