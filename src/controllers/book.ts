import { Request, Response } from "express"
import { bookUpdated, deletedBook, getBookDB, getBooksDB, insertBook } from "../services/book.services"
import { handleHttpError } from "../utils/error-handle"
import { JwtPayload } from "jsonwebtoken"

interface RequestExt extends Request {
    user?: string | JwtPayload
}

const getBooks = async(req: RequestExt, res: Response) => {

     try {

        const booksFounded = await getBooksDB()

        res.send({
            user: req.user,
            data: booksFounded
        })
        
     } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR_GET_BOOKS')
     }

}

const getBook = async(req: Request, res: Response) => {

    try {
        
        const { id } = req.params

        const data = await getBookDB(id)

        res.send(data)

    } catch (error) {
        handleHttpError(res, 'ERROR_GET_BOOK')
        console.log(error);
    }
}

const createBook = async({body}: Request, res: Response) => {

    try {

        const data = await insertBook(body)
        
        res.send(data)

    } catch (error) {
        handleHttpError(res, 'ERROR_CREATING_BOOK')
        console.log(error);
    }
}

const updateBook = async({params, body}: Request, res: Response) => {

    try {

        const { id } = params

        const updated = await bookUpdated(id, body)

        res.send(updated)

    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATING_BOOKS')
        console.log(error);
    }
}

const deleteBook = async({params, body}: Request, res: Response) => {

    try {

        const { id } = params
        
        const deleted = await deletedBook(id)

        res.send(deleted)

    } catch (error) {
        handleHttpError(res, 'ERROR_DELETING_BOOKS')
        console.log(error);
    }
}

export {getBooks, getBook, createBook, updateBook, deleteBook}