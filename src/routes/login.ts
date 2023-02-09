import { Request, Response, Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/user";
import { checkErrors } from "../validations/validations-errors";

const router = Router()

router.post('/', [
    check('email', 'The email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    checkErrors
], login)

export { router }