const express = require('express')
const cors = require('cors')
const { default: axios } = require("axios");

const corsOptions = {
   origin: 'https://yourdomain.com',
 }

const app = express()

const PORT = 8083
const HOST = '192.168.1.96'

app.get('/client', async (req, res, next) => {
    try{
        const result = await axios.get("http://192.168.1.96:8080/").then(res => res.data)
        console.log('request feito')
        res.json({
            "servidor": "192.168.1.96:8083",
            "responseBody": `${JSON.stringify(result)}`
    })
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
