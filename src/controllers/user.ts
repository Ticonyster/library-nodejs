import { Request, Response } from "express"
import UserModel from "../models/user"
import { createUser, loginUser } from "../services/user.services"
import { handleHttpError } from "../utils/error-handle"
import {genSaltSync, hashSync} from 'bcryptjs'

const signUp = async({body}: Request, res: Response) => {

    try {

        let { password } = body
        
        const salt = genSaltSync(10)

        body.password = hashSync(password, salt)

        const user = await createUser(body)

        res.send('User created successfully')
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATING_BOOK')
        console.log(error);
    }
}

const login = async({body}: Request, res: Response) => {

    const {email, password, role} = body

    const existsUser = await UserModel.findOne({email})

    const user = await loginUser({email, password})

    if(user === 'Incorrect password.' || email !== existsUser?.email){
        res.status(403)
        res.send(user)
    } else {
        //console.log(user);
        res.send(user)
    }
}

export { signUp, login }