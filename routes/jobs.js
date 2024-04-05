const express = require ('express')

const Router = express.Router()
const {getAlljob,Singlejob,Updatejob,Deletejob,Createjob} = require('../controllers/jobs')


Router.route('/').get(getAlljob).post(Createjob)
Router.route('/:id').patch(Updatejob).delete(Deletejob).get(Singlejob)


module.exports = Router