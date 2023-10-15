import express, {Request, Response} from 'express'
import {productsRouter, videosRouter} from './routers/products-router';

const app = express()
const port = process.env.PORT || 5000

const  parserMiddleware = express.json()
app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('HI SAMURAI')
})


app.use('/products', productsRouter)
app.use('/', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})