import { Response } from "express";

const handleHttpError = (res: Response, error: string) => {

    res.status(500)
    
    res.send({error})
}

const validateData = (res: Response, error: string) => {

    res.status(403)
    
    res.send({error})
}

export { handleHttpError, validateData}