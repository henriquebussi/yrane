const express = require('express')
const bodyParser = require("body-parser")

const app = express()
const cors = require("cors")
const { log } = require('console')
app.use(cors())
app.use(bodyParser.json())

app.post("/submit-form", (req, res) => {
    const userData = req.body
    console.log("Dados do formulario recebidos", userData);
    res.status(200).send("Dados Recebidos com Sucesso!")
})

app.listen(3000, () =>{
    console.log("Servidor Iniciado na porta 3000");
})