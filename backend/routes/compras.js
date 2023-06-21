const {Router} = require('express')

const route = Router()

const {getCompra, postCompra, putCompra, deleteCompra} = require('../controllers/compra')

route.get('/', getCompra)

route.post('/', postCompra)

route.put('/', putCompra)

route.delete('/', deleteCompra)

module.exports = route