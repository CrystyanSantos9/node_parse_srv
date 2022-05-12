'use strict';
const express = require('express');
const cors = require('cors')
const exec = require('child_process').exec
const { spawn } = require('node:child_process');



// Constants
const PORT = 8080;
// const HOST = '0.0.0.0';
const HOST = '192.168.1.96'

var corsOptions = {
   origin: 'http://example.com',
   methods: "HEAD,PUT,PATCH,POST,DELETE",
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }

//Inicializando app
// App
const app = express();
app.use((req, res,next)=> {
   // console.log('passou pelo middleware')

   //deixar só cors deixa livre todas as requests 
   // res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
   res.header("Access-Control-Allow-Methods", 'PUT, POST');
   app.use(cors());
   next();
})

//App formato de entrada dos dados recebidos
app.use(express.json())
app.use(express.urlencoded({ extended: true}))









app.get('/', (req, res) => {
 // res.json({value: '450.00'});
  res.send('{"name":"John", "age":30, "city":"New York", "balance": "450.00"}');
  const clientIp = req.socket.remoteAddress;
  const clientPort = req.socket.remotePort;
  console.log(`Origin host${clientIp} in port ${clientPort}`)
});

app.post('/', (req, res) => {
 
   const request = req.body
   const ls = spawn('echo', [null, JSON.stringify(request)]); 	
  
//   console.log(request)
  res.json({requestBody: request})

        ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
