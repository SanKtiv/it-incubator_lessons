import {Request, Response, Router} from 'express';
import {videosRepository, error, resolutionsFalse} from "../repositories/videos-repository";

export const videosRouter = Router ({})

videosRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    videosRepository.deleteAllVideo()
    res.sendStatus(204)
})

videosRouter.delete('/videos/:videoId', (req: Request, res: Response) => {
    if (!/^\d+$/.test(req.params.videoId)) {
        res.sendStatus(404)
        return
    }
    const status = videosRepository.deleteVideoId(req.params.videoId)
    res.sendStatus(status)
})

videosRouter.get('/videos', (req: Request, res: Response) => {
    const videos = videosRepository.getVideo()
    res.status(200).send(videos)
})

videosRouter.get('/videos/:videoId', (req: Request, res: Response) => {
    if (!/^\d+$/.test(req.params.videoId)) {
        res.sendStatus(404)
        return
    }
    const videos = videosRepository.getVideoId(req.params.videoId)
    if (videos) {
        res.status(200).send(videos)
    } else {
        res.sendStatus(404)
    }
})

videosRouter.post('/videos', (req: Request, res: Response) => {
    const title = req.body.title
    if (typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send(error('title'))
        return
    }
    const author = req.body.author
    if (typeof author !== 'string' || !author.trim() || author.length > 20) {
        res.status(400).send(error('author'))
        return
    }
    const availableResolutions = req.body.availableResolutions
    if (resolutionsFalse(availableResolutions)) {
        res.status(400).send(error('availableResolutions'))
        return
    }
    const videos = videosRepository.createVideo(title, author, availableResolutions)
    res.status(201).send(videos)
})

videosRouter.put('/videos/:videoId', (req: Request, res: Response) => {
    const videoId = req.params.videoId
    if (!/^\d+$/.test(videoId)) {
        res.status(400).send(error('videoId'))
        return
    }
    const title = req.body.title
    if (typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send(error('title'))
        return
    }
    const author = req.body.author
    if (typeof author !== 'string' || !author.trim() || author.length > 20) {
        res.status(400).send(error('author'))
        return
    }
    const availableResolutions = req.body.availableResolutions
    if (resolutionsFalse(availableResolutions)) {
        res.status(400).send(error('availableResolutions'))
        return
    }
    const canBeDownloaded = req.body.canBeDownloaded
    if (typeof canBeDownloaded !== "boolean") {
        res.status(400).send(error('canBeDownloaded'))
        return
    }
    const minAgeRestriction = req.body.minAgeRestriction
    if ( minAgeRestriction > 18 || minAgeRestriction < 1 || typeof minAgeRestriction === 'string') {
        res.status(400).send(error('minAgeRestriction'))
        return
    }
    const publicationDate = req.body.publicationDate
    if (typeof publicationDate !== 'string' || !publicationDate.trim()) {
        res.status(400).send(error('publicationDate'))
        return
    }

    const status = videosRepository.updateVideo(req.params.videoId, req.body)
    res.sendStatus(status)

})