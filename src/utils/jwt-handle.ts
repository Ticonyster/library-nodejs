import {sign, verify} from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || ''

const generateToken = (email: string) => {

    const jwt = sign( {email} , JWT_SECRET, {
        expiresIn: '1h'
    })

    return jwt
}

const verifyToken = (jwt: string) => {

    const isValid = verify(jwt, JWT_SECRET)

    return isValid

}

export { generateToken, verifyToken }