import 'dotenv/config'
import express from "express";
import productsRouter from './routes/products.js'
import whRouter from './routes/wh.js'
import { error_handler } from './middlewares/error_handler.js';
import morgan from 'morgan'
import helmet from 'helmet'
import pino_http from 'pino-http'
import pino from 'pino'
import fs from 'fs';
import cors from 'cors'



let app = express();

app.use(helmet())

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(morgan("tiny"))

/**
 * this logging is just to keep things simple for now 
 * we should create a prisma model "stock_changes" 
 * use transation to make sure no event happens unless it's logged
 * we can then query the database
 */
if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}
const logStream = pino.destination('./logs/logs.log')
app.use(pino_http({
  quietReqLogger: true,
  quietResLogger: true,
  autoLogging: false,
}, logStream))

app.use(express.json())

app.use('/api/products', productsRouter)

app.use('/api/wh', whRouter)

let PORT = process.env.PORT || 3000

app.use(error_handler)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
})
