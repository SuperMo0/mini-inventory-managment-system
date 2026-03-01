import './lib/node_env.js'
import express from "express";
import productsRouter from './routes/products.js'
import whRouter from './routes/wh.js'
import { error_handler } from './middlewares/error_handler.js';
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { prisma } from './lib/prisma.js'


let app = express();

app.use(helmet())

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(morgan("tiny"))

app.use(express.json())

app.use('/api/products', productsRouter)

app.use('/api/wh', whRouter)



// we should Implement pagination 
app.get('/api/logs', async (req, res) => {
  let logs = await prisma.stock_changes.findMany({
    take: 20,
    orderBy: {
      created_at: 'desc'
    }
  })
  res.json({
    logs
  })
})

let PORT = process.env.PORT || 3000

app.use(error_handler)

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
})

export default app
