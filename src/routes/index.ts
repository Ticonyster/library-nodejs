import { Router } from "express";
import { readdirSync } from 'fs'

const PATH = `${__dirname}`

const router = Router()

/**
 * 
 * 
 * @returns 
 */
const cleanFileName = (fileName: string) => {
    const file = fileName.split('.').shift()
    return file
}


readdirSync(PATH).filter((fileName) => {
    const cleanName = cleanFileName(fileName)

    if(cleanName !== 'index'){
        import(`./${cleanName}`).then((moduleRouter) => {
            router.use(`/${cleanName}`, moduleRouter.router)
        })
    }
})

export { router }