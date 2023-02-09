import { Schema, model } from "mongoose";
import { Book } from "../interfaces/book.interface";

const BookSchema = new Schema<Book>(
    {
        name: {
            type: String,
            required: true
        },

        author: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        genre: {
            type: String,
            enum: ['Narrative', 'Lyrical', 'Dramatic', 'Didactic'],
            required: true
        }, 

        year: {
            type: Number
        },

        price: {
            type: Number,
            required: true
        },

        status: {
            type: Boolean,
            default: true
        }

    }, 
    {
        timestamps: true,
        versionKey: false
    }
)

const BookModel = model('Books', BookSchema)

export default BookModel
