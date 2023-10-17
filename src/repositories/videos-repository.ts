import e from "express";

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string> | null
}

type ErrorType = {
    errorsMessages: [{message: string, field: string}]
}

export const error = (mess: string): ErrorType => {
    return {
        errorsMessages: [{message: `Wrong ${mess}`, field: mess}]
    }
}

type DataForUpdateVideo = {
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    publicationDate: string,
    availableResolutions: Array<string> | null
}

let dateNow = new Date
let dateNowAndDay = new Date
dateNowAndDay.setDate(dateNowAndDay.getDate() + 1)


const defaultVideo: VideoType = {
    id: 1,
    title: 'Zero',
    author: 'Zerovich',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: dateNow.toISOString(),
    publicationDate: dateNow.toISOString(),
    availableResolutions: ['P1080']
}

const resolutionsTrue: Array<string> = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

export const resolutionsFalse = (resolutions: Array<string> | null) => {
    return resolutions !== null && resolutionsTrue.indexOf(resolutions[0]) === -1? true : false;
}

const errorMes: ErrorType = {
    errorsMessages: [{message: 'string', field: 'string'}]
}

const listOfVideos: VideoType[] = [defaultVideo] // Database of Videos

export const videosRepository = {

    deleteAllVideo():void {
        listOfVideos.splice(0, listOfVideos.length)
    },

    deleteVideoId(videoId: string): number {
        const findedVideo = listOfVideos.find(v => v.id === +videoId)
        if (findedVideo) {
            const indexOfDelleteVideo = listOfVideos.indexOf(findedVideo)
            listOfVideos.splice(indexOfDelleteVideo, 1)
            return 204
        } else {
            return 404
        }
    },

    getVideo(): VideoType[] {
        return listOfVideos
    },

    getVideoId(videoId: string): VideoType | undefined {
        return listOfVideos.find(v => v.id === +videoId)
    },

    createVideo(title: string, author: string, availableResolutions: Array<string> | null): VideoType {
        const newVideo: VideoType = {
            id: Date.now(),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: dateNow.toISOString(),
            publicationDate: dateNowAndDay.toISOString(),
            availableResolutions
        }
        listOfVideos.push(newVideo)
        return newVideo
    },

    updateVideo(videoId: string, dataUpdate: any): number {
        const findedVideo = listOfVideos.find(v => v.id === +videoId)
        if (findedVideo) {
            listOfVideos.forEach(v => {
                if (v.id === +videoId) {
                    v.title = dataUpdate.title
                    v.author = dataUpdate.author
                    v.availableResolutions = dataUpdate.availableResolutions
                    v.canBeDownloaded = dataUpdate.canBeDownloaded
                    v.minAgeRestriction = dataUpdate.minAgeRestriction
                    v.publicationDate = dataUpdate.publicationDate
                }
            })
            return 204
        } else {
            return 404
        }
    }
}