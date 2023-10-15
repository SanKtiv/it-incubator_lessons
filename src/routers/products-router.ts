import {Request, Response, Router} from 'express';
import {productsRepository} from '../repositories/products-repository';
import {videosRepository} from "../repositories/products-repository";

export const productsRouter = Router({})
export const videosRouter = Router ({})
productsRouter.get('/', (req: Request, res: Response) => {
    const products = productsRepository.getProducts()
    res.send(products)
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    if (newProduct) {
        res.status(201).send(newProduct)
    } else {
        res.sendStatus(404)
    }
})
productsRouter.delete('/', (req: Request, res: Response) => {
    const deletedProduct = productsRepository.deleteProduct(req.body.title)
    if (deletedProduct) {
        res.status(201).send('delete')
    } else {
        res.sendStatus(404)
    }
})

productsRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    res.sendStatus(204)
})

productsRouter.get('/api/videos', (req: Request, res: Response) => {
    const products = productsRepository.getProducts()
    res.send(products)
})

videosRouter.get('/videos', (req: Request, res: Response) => {
    const videos = videosRepository.getVideo()
    res.send(videos)
})

videosRouter.post('/videos', (req: Request, res: Response) => {
    const videos = videosRepository.createVideo(req.body.title, req.body.author, req.body.availableResolutions)
    res.status(201).send(videos)
})