if (process.env.NODE_ENV === 'development') require('dotenv').config()
import * as express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/', require('./routes'))
app.use('*', require('./middlewares/404'))
app.use(require('./middlewares/errorHandler'))

export default app
