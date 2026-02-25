import 'dotenv/config'
import express from "express";
import productsRouter from './routes/products.js'
import whRouter from './routes/wh.js'

let app = express();

app.use('/api/products', productsRouter)

app.use('/api/wh', whRouter)

app.listen(3000, () => {
  console.log(process.env.DATABASE_URL);
  console.log('server listening on port 3000');
})
