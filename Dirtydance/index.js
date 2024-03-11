const api = require('./api')

//chamar o express
const express = require('express');

//criando uma instancia com o nome server

const server = express();


server.use(express.json());

// porta

// deixar o server publico na porta 3000

server.listen(3000)

// rota
server.get('/home', (req, res) => {
    return res.send({home: 'ola mundo'})
})

server.get('/parametro', (req, res) =>{
    const {name, idade} = req.query;


    return res.send({resultado: `Seja Bem Vindo, ${name} e minha idade é ${idade}`})}) 

// Para executar no powershell "node index.js" e colocar "http://localhost:3000/home"
// para acessar = http://localhost:3000/parametro?nome='nome'&idade='idade'
// mas tem que executar node (nome_do_arquivo [no caso é node.js])



let produtos = []

// Post = Insert

server.post('/produtos', (req, res) =>{ 
    const {id, nome, preco} = req.body

    produtos.push({id: id, nome: nome, preco: preco})
    res.send({mensagem: "Sucesso!"})
})

server.get ('/produtos', (req, res) => {
    res.send({produtos});
})

//Get = Select (List)
//Req = Requisição

server.put ('/produto', (req, res) =>{
    const {id, nome, preco} = req.body 
    const {outronome} = req.query

    const posicao = produtos.findIndex(item => item.nome === outronome)

    produtos[posicao].nome = nome;
    produtos[posicao].preco = preco;
    produtos[posicao].id = id;

    res.send({Mensagem: "Sucesso!"})
})
//yarn

server.delete('/produto/:id', (req, res) => {
    const {id}  =req.params;

    const newProduto = produtos.filter(item => item.id !== parseInt(id))
    produtos = newProduto;
    res.send({message: 'Sucesso!'})
})

//async - assincrona (não tem tempo exato de responder)

//await - não retorna, não prossiga enquanto

server.get('/pokemon/:id', async (req, res) => {

    const {id} = req.params
    try{ 
        const {data} = await api.get(`pokemon/${id}`)
        return res.send({name: data.name})
    } catch (error) {
        res.send({ erro: error.message})
    }
})

const apikey = '212afe3babeb419b3b74c9fecdbd2c91';
const axios = require('axios')

server.get('/climatempo/:cidade', async (req, res) => {
    const city = req.params.cidade;
    try{
        const response = await axios.get (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)

        res.send({Temperatura: response.data.main.temp})

    } catch(error){
        res.send({ erro: 'Erro ao obter dados metereológicos', error})
    }
})


// server.get('/tempo/', async (req, res) => {
//     const {id} = req.params
//     try{
//         const {data} = await apitempo.get(`tempo/${id}`)
//         return res.send({name: data.name})
//     } catch (error) {
//         res.send({ erro: error.message})
//     }
// })