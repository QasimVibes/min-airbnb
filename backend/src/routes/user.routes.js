
import { Router } from 'express'
import { createUser, loginUser, logoutUser,getCurrentUser,deleteUser } from '../controllers/user.controller.js'
import { handleValidationErrors, validateCreateUser, validateLoginUser } from '../middlewares/userValidation.middleware.js'
import { varifyJwt } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/create").post(validateCreateUser, handleValidationErrors, createUser)
router.route("/login").post(validateLoginUser, handleValidationErrors, loginUser)

router.use(varifyJwt)
router.route("/logout").post(logoutUser)
router.route("/current").get(getCurrentUser)
router.route("/delete").delete(deleteUser)

export default router