import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { comparePassword } from "../utils/bcrypt-handle";
import { generateToken } from "../utils/jwt-handle";

const createUser = async(user: User) => {

    const userData = await UserModel.create(user)

    userData.save()

    return userData
}

const loginUser = async({email, password}: Auth) => {
    
    const existsUser = await UserModel.findOne({email})

    if(!existsUser) return('It seems that the email you entered is not registered.')

    const passwordHash = existsUser.password

    const verifyPass = await comparePassword(password, passwordHash)

    if(!verifyPass) return ('Incorrect password.')

    const token = generateToken(email)

    const data = {
        token, 
        user: existsUser
    }

    return data
}

export {createUser, loginUser}