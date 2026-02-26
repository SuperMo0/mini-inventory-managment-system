import 'dotenv/config'
import express from "express";
import productsRouter from './routes/products.js'
import whRouter from './routes/wh.js'
import { error_handler } from './middlewares/error_handler.js';
import morgan from 'morgan'
import helmet from 'helmet'

let app = express();

app.use(helmet())

app.use(morgan("tiny", {}))

app.use(express.json())

app.use('/api/products', productsRouter)

app.use('/api/wh', whRouter)

let PORT = process.env.PORT || 3000

app.use(error_handler)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
})
