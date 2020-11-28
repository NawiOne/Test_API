const Router = require('express').Router()
const mainController = require('../controllers/index')

Router.post('/', mainController.insertToExcel)
Router.get('/', mainController.readExcel)

module.exports = Router;