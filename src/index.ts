import express,{Request,Response,NextFunction,ErrorRequestHandler} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import router from './routers/router'

dotenv.config()
const {SERVER_PORT} = process.env

const app : express.Application = express()

mongoose.connect('mongodb://localhost:27017/dbname')
    .then(():void => {
        console.log('connected to mongodb')
        app.listen(SERVER_PORT||8080,():void => {
            console.log(`Server is running ... http://localhost:${SERVER_PORT}`)
        })
    })
    .catch(err=>console.log(err))

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

///////handle all routes//////////
app.use(router)
////////////////////////////////

// Error Handler
app.use((error:ErrorRequestHandler,req:Request, res:Response, next:NextFunction):Response => {
    return res.status(500).json({error: error+" "})
})

// Not Found Handler
app.use( (req:Request, res:Response, next:NextFunction) : Response =>{
    return res.status(404).json({error:'Route is Not Found'})
})
