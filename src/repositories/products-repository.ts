type ProductType = {
    title: string
    id: string
}

let products: ProductType[] = [{id: '1', title: 'tomato'}, {id: '2', title: 'orange'}]

export  const productsRepository = {
    getProducts(): ProductType[] {
        return products
    },
    createProduct(title: string): ProductType | null {
        if (!title.trim()) {
            return null
        }

        const newProduct: ProductType = {
            title,
            id: Date.now().toString()
        }
        products.unshift(newProduct)
        return newProduct
    },
    deleteProduct(title: string): boolean | null {
        if (!title.trim()) {
            return null
        }

        let indexDeletedProduct: number = -1

        for (let i = 0; i < products.length; i++) {
            if (products[i].title === title) {
                indexDeletedProduct = i
            }
        }

        if (indexDeletedProduct >= 0) {
            products.splice(indexDeletedProduct, 1)
            return true
        } else {
            return null
        }
    }
}

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}

type CreateErrorType = {
    errorsMessages: [{message: string, field: string}]
}

type DataForUpdateVideo = {
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    publicationDate: string,
    availableResolutions: Array<string>
}

let dateNow = new Date

const defaultVideo: VideoType = {
    id: 0,
    title: 'Zero',
    author: 'Zerovich',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: dateNow.toISOString(),
    publicationDate: dateNow.toISOString(),
    availableResolutions: ['P1080']
}

const resolutionsTrue: Array<string> = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

const errorMes: CreateErrorType = {
    errorsMessages: [{message: 'string', field: 'string'}]
}

const videos: VideoType[] = [defaultVideo] // Database of Videos

export const videosRepository = {
    getVideo(): VideoType[] {
        return videos
    },
    getVideoId(videoId: string): VideoType | undefined {
        if (!videoId.trim) {
            return undefined
        }
        const video: VideoType | undefined = videos.find(v => v.id === Number(videoId))
        return video
    },
    createVideo(title: string, author: string, availableResolutions: Array<string>): VideoType | CreateErrorType {

        if (!title.trim()) {
            errorMes.errorsMessages[0].message = 'Wrong title'
            errorMes.errorsMessages[0].field = 'title is empty'
            return errorMes
        }

        if (!author.trim()) {
            errorMes.errorsMessages[0].message = 'Wrong author'
            errorMes.errorsMessages[0].field = 'author is empty'
            return errorMes
        }

        if (resolutionsTrue.indexOf(availableResolutions[0]) == -1) {
            errorMes.errorsMessages[0].message = 'Wrong Resolutions'
            errorMes.errorsMessages[0].field = 'Resolutions is incorrect'
            return errorMes
        }

        const newVideo: VideoType = {
            id: Date.now(),
            title,
            author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: dateNow.toISOString(),
            publicationDate: dateNow.toISOString(),
            availableResolutions
        }

        videos.push(newVideo)

        return newVideo
    },
    updateVideo(videoId: string, dataUpdate: any): CreateErrorType | number {

        if (!dataUpdate.title.trim()) {
            errorMes.errorsMessages[0].message = 'Wrong title'
            errorMes.errorsMessages[0].field = 'title is empty'
            return errorMes
        }

        if (!dataUpdate.author.trim()) {
            errorMes.errorsMessages[0].message = 'Wrong author'
            errorMes.errorsMessages[0].field = 'author is empty'
            return errorMes
        }

        if (resolutionsTrue.indexOf(dataUpdate.availableResolutions[0]) == -1) {
            errorMes.errorsMessages[0].message = 'Wrong Resolutions'
            errorMes.errorsMessages[0].field = 'Resolutions is incorrect'
            return errorMes
        }

        if (!(dataUpdate.canBeDownloaded === 'true' || dataUpdate.canBeDownloaded === 'false')) {
            errorMes.errorsMessages[0].message = 'Wrong canBeDownloaded'
            errorMes.errorsMessages[0].field = 'canBeDownloaded is incorrect'
            return errorMes
        }

        if (!(dataUpdate.minAgeRestriction >= 1 && dataUpdate.minAgeRestriction <= 18 || dataUpdate.minAgeRestriction === null)) {
            errorMes.errorsMessages[0].message = 'Wrong minAgeRestriction'
            errorMes.errorsMessages[0].field = 'minAgeRestriction is incorrect'
            return errorMes
        }

        const findedVideo = videos.find(v => v.id === Number(videoId))

        if (findedVideo) {
            videos.forEach(v => {
                if (v.id === Number(videoId)) {
                    v.title = dataUpdate.title
                    v.author = dataUpdate.author
                    // v.availableResolutions = dataUpdate.availableResolutions
                    // v.canBeDownloaded = dataUpdate.canBeDownloaded
                    // v.minAgeRestriction = dataUpdate.minAgeRestriction
                    // v.publicationDate = dataUpdate.publicationDate
                }
            })
            return 204
        } else {
            return 404
        }
    }
}