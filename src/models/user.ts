import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true
        },

        lastname: {
            type: String,
            required: true
        }, 

        age: {
            type: Number,
            required: false
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true 
        },

        role: {
            type: String,
            enum: ['ADMIN_ROLE', 'USER_ROLE'],
            default: 'USER_ROLE'
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
)

const UserModel = model('Users', UserSchema)

export default UserModel