import express from 'express'
const app = express()
const port = 4000

app.use(express.urlencoded({extended: true})) //Converte caracteres especiais em html entity
app.use(express.json()) //Executará o Parse no conteúdo JSON
app.disable('x-powered-by') //Removendo por questões de segurança

import rotasProdutos from './routes/produtos.js'

//Rotas Restfull do app
app.use('/api/produtos', rotasProdutos)

//Definição da Rota default
app.get('/api', (req, res) => {
    res.status(200).json({
        mensagem: 'API do app Loja 100% funcional!',
        versao: '1.0.0'
    })
})

//Rota de conteúdo publico
app.use('/', express.static('public'))

//Rota para tratar erros 404
app.use(function(req, res) {
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, function() {
    console.log(`Servidor web rodando na porta ${port}`)
})