import sql from 'mssql'
import { sqlConfig } from './sql/config.js'

sql.on('error', err => {
    console.error(err)
})

sql.connect(sqlConfig).then(pool => {
    //Executar a Stored Procedure
    return pool.request()
    .input('codbarras', sql.Char(4), '4321')
    .input('nome', sql.VarChar(50), 'Refrigerador Brastemp')
    .input('categoria', sql.VarChar(20), 'Eletrodomésticos')
    .input('preco', sql.Numeric, 3599)
    .input('inclusao', sql.SmallDateTime, '2021-09-27')
    .output('codigogerado', sql.Int)
    .execute('SP_I_LOJ_PRODUTO')
}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err.message)
})