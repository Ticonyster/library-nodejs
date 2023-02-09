import { compare } from "bcryptjs";

const comparePassword = async(password: string, hash: string) => {

    const passwordVerified = await compare(password, hash)

    return passwordVerified
}

export {comparePassword}