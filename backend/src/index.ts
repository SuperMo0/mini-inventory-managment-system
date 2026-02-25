import 'dotenv/config'
import express from "express";
import productsRouter from './routes/products.js'
import whRouter from './routes/wh.js'

let app = express();



app.use('/api/products', productsRouter)
app.use('/api/wh', whRouter)


let PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})
