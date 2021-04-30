const mysql      = require('mysql');
const database = process.env.MYSQL_DATABASE;
const connection = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.DB_HOST,
  port: 3306,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : database
});


const express = require('express');
const port = 3000;
const server = express();


async function  handleQuery(sql){
    return new Promise((resolve,reject) =>{
        connection.query(sql,function (error, results, fields){
            if (error){
                console.log(error);
                if(error.code =="ECONNREFUSED")
                    return reject(new Error('Aguardando Conexão Com Bando de Dados! Tente novamente mais tarde'));
                return reject(new Error("Erro ao acessar banco de dados!"));
            }
            return resolve(results);
        });

    });

}

server.get('/pfa',async (req,res)=>{
    const sql = `Select * from modules`; 
    try{
        return  res.send(await handleQuery(sql));
    }catch(error){
        res.status(500).send({error : error.message});
    }  
   
});

server.get('/',async (req,res)=>{
    const sql = `Select * from peaple`; 
    try{
        const peaples = await handleQuery(sql);
        const peaplesLi = peaples.map(p =>`
            <li>${p.name}</li>
        `);
        const fullcycle = `<h1>Full Cycle Rocks!</h1>`;
        const response = `${fullcycle}
        <ul>${peaplesLi.map(p=>p).join(' ')} <ul>
        `
        return  res.send(response);
    }catch(error){
        res.status(500).send({error : error.message});
    }    
});


server.listen(port, ()=>{
    console.log(`server listening in port ${port}`)
});