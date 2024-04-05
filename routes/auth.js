const express = require ('express')

const Router = express.Router()
const {Login,Register} = require('../controllers/auth')



Router.route('/login').post(Login)
Router.route('/register').post(Register)


module.exports = Router