import { Router } from "express";
import { signUp } from "../controllers/user";
import { emailExists } from "../middlewares/users-validations";
import { checkBodyUsers } from "../middlewares/validations";
import { createUser } from "../services/user.services";
import { checkErrors } from "../validations/validations-errors";


const router = Router()

router.post('/', [
    checkBodyUsers,
    emailExists,
    checkErrors
], signUp)

export { router }