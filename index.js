const express = require('express');
const port = 3000;
const server = express();

server.get('/',(req,res)=>{
    return res.send("PFA Docker!");
})

server.listen(port, ()=>{
    console.log(`server listening in port ${port}`)
})