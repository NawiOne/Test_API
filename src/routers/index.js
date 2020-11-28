const Router = require('express').Router()
const mainController = require('../controllers/index')

Router.post('/user', mainController.insertToExcel)
Router.get('/user', mainController.readExcel)
Router.get('/primes', mainController.primes)

module.exports = Router;