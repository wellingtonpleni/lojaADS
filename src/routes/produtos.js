//API REST dos produtos da loja
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'
const router = express.Router()

/*******************************************
 * GET/produtos
 * Retorna todos os produtos
 *******************************************/
router.get("/", (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .execute('SP_S_LOJ_PRODUTO')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }catch (err){
        console.error(err)
    }
})

/*******************************************
 * GET/produtos/:codbarras
 * Retorna um produto pelo código de barras
 *******************************************/
 router.get("/:codbarras", (req, res) => {
     const codbarras = req.params.codbarras
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
            .input('codbarras', sql.Char(4), codbarras)
            .execute('SP_S_LOJ_PRODUTO_CODBARRAS')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    }catch (err){
        console.error(err)
    }
})

/*******************************************
 * POST/produtos
 * Insere um novo produto
 *******************************************/
router.post("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {codbarras, nome, categoria, preco, inclusao} = req.body
        return pool.request()
        .input('codbarras', sql.Char(4), codbarras)
        .input('nome', sql.VarChar(50), nome)
        .input('categoria', sql.VarChar(20), categoria)
        .input('preco', sql.Numeric, preco)
        .input('inclusao', sql.SmallDateTime, inclusao)
        .output('codigogerado', sql.Int)
        .execute('SP_I_LOJ_PRODUTO')
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message) //bad request
    })
})

/*******************************************
 * PUT/produtos
 * Altera os dados de um produto
 *******************************************/
 router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {codbarras, nome, categoria, preco, inclusao} = req.body
        return pool.request()
        .input('codbarras', sql.Char(4), codbarras)
        .input('nome', sql.VarChar(50), nome)
        .input('categoria', sql.VarChar(20), categoria)
        .input('preco', sql.Numeric, preco)
        .input('inclusao', sql.SmallDateTime, inclusao)
        .execute('SP_U_LOJ_PRODUTO')
    }).then(dados => {
        res.status(200).json('Produto alterado com sucesso!')
    }).catch(err => {
        res.status(400).json(err.message) //bad request
    })
})

/*******************************************
 * DELETE/produtos/:codbarras
 * Apaga um produto pelo código de barras
 *******************************************/
router.delete('/:codbarras', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const codbarras = req.params.codbarras
        return pool.request()
        .input('codbarras', sql.Char(4), codbarras)
        .execute('SP_D_LOJ_PRODUTO')
    }).then(dados => {
        res.status(200).json('Produto excluido com sucesso!')
    }).catch(err => {
        res.status(400).json(err.message)
    })
})

export default router