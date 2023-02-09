import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt-handle";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
    user?: string | JwtPayload
}

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {

    try {

        const jwtByUser = req.headers.authorization || ''
        const jwt = jwtByUser.split(' ').pop()
        const isUser = verifyToken(`${jwt}`)

        if(!isUser){
            return res.status(401).send('There was a problem with the session.')
        } else {
            //req.user = isUser
            //console.log({jwtByUser});
            next()
        }

    } catch (error) {
        console.log(error);
        res.status(400)
        res.send('INVALID SESSION')
    }
}

export {checkJwt}