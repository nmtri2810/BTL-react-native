import express from 'express'
import initApiRoute from './route/api.js'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//init api route
initApiRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})