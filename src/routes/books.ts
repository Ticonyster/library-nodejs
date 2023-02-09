import { Router } from "express";
import { check } from 'express-validator'
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/book";
import { checkJwt } from "../middlewares/sessions";
import { checkBodyBooks, existsId, findBook, validateRole, verifyId } from "../middlewares/validations";

import { checkErrors } from "../validations/validations-errors";

const router = Router()

router.get('/', checkJwt, getBooks)

router.get('/:id?', [
    check('id', 'Invalid Id').isMongoId(),
    checkJwt,
    existsId,
    checkErrors
], getBook)

router.post('/', [
    checkJwt,
    checkBodyBooks, 
    findBook, 
    checkErrors
], createBook)

router.put('/:id?', [
    check('id', 'Id is required').notEmpty(),
    //existsId,
    check('id', 'Invalid id').isMongoId(),
    checkJwt,
    existsId,
    validateRole,
    checkErrors
], updateBook)

router.delete('/:id?', [
    check('id', 'Id is required').notEmpty(),
    check('id', 'Invalid id').isMongoId(),
    checkJwt,
    existsId,
    validateRole,
    checkErrors
], deleteBook)

export { router }