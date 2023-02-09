import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import BookModel from "../models/book"
import UserModel from "../models/user"
import jwt_decode from "jwt-decode";
import { MyToken } from "../interfaces/auth.interface"

const existsId = async(req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    
    const findId = await BookModel.findById(id)

    if(!findId){
        return res.status(404).send('Id not found.')
    }

    next()
}

const verifyId = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    const MONGO_ID = mongoose.isValidObjectId(id)

    if(MONGO_ID == false){
        return res.status(400).send('Invalid id.')
    }

}

const checkBodyBooks = (req: Request, res: Response, next: NextFunction) => {

    const { name, author, description, genre, price } = req.body
    //const { ...data } = req.body

    if(!name || !author || !description || !genre || !price){
        return res.status(400).send('There are fields that are required.')
    }

    next()

}

const findBook = async({body}: Request, res: Response, next: NextFunction) => {

    const {name} = body

    const bookDB = await BookModel.findOne({name})

        if(bookDB) {
            return res.status(400).send('That book already exists.')
        }

    next()

}

const checkBodyUsers = (req: Request, res: Response, next: NextFunction) => {

    const { name, lastname, email, password } = req.body
    //const { ...data } = req.body

    if(!name || !lastname || !email || !password){
        return res.status(400).send('There are fields that are required.')
    }

    next()

}

const validateRole = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers['authorization']

    if(token){

        const decode = jwt_decode<MyToken>(token)

        const { email } = decode

        const user = await UserModel.findOne({email})

        if(user?.role !== 'ADMIN_ROLE'){
            return res.status(403).send('You do not have permission to perform this action.')
        }
        
        next()
    }      
}

export { existsId, verifyId, checkBodyBooks, checkBodyUsers, findBook, validateRole }