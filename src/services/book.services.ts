import { Book } from "../interfaces/book.interface";
import BookModel from "../models/book";

const insertBook = async(book: Book) => {
    const bookInserted = await BookModel.create(book)

    bookInserted.save()

    return bookInserted
}

const getBooksDB = async() => {

    const books = await BookModel.find({status: true})

    return books
}

const getBookDB = async(id: string) => {

    const books = await BookModel.findOne({_id: id})

    return books
}

const updatedBook = async (id: string, body: Book) => {
    const book = await BookModel.findByIdAndUpdate({_id: id}, body, {
        new: true
    })

    return book
}

const deletedBook = async (id: string) => {

    
    const book = await BookModel.findByIdAndUpdate(id, {status: false})

    return book
}


export { insertBook, getBooksDB, getBookDB, updatedBook as bookUpdated, deletedBook }