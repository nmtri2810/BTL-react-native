import express from 'express'
import APIController from '../controller/APIController.js'

let router = express.Router()

const initApiRoute = (app) => {
    router.get('/users', APIController.getAllUser)
    router.post('/signup', APIController.createNewUser)
    router.put('/update-user', APIController.updateUser)
    router.delete('/delete-user/:id', APIController.deleteUser)

    return app.use('/api/', router)
}

export default initApiRoute