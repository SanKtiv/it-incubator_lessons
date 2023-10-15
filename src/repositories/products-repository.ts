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
    minAgeRestriction: null,
    createdAt: string,
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

const videos: VideoType[] = [defaultVideo]

export const videosRepository = {
    getVideo(): VideoType[] {
        return videos
    },
    createVideo(title: string, author: string, availableResolutions: Array<string>): VideoType | null {

        const resolutionsTrue: Array<string> = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

        if (!title.trim() || !author.trim()) {
            return null
        }

        if (resolutionsTrue.indexOf(availableResolutions[0]) == -1) {
            return  null
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
}
}