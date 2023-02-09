import { NextFunction, Request, Response } from "express"
import UserModel from "../models/user"

const emailExists = async({body}: Request, res: Response, next: NextFunction) => {

    const { email } = body

    const emailDB = await UserModel.findOne({email})

    if(emailDB){
        return res.status(400).send('That email already exists.')
    }

    next()
}

export {emailExists}