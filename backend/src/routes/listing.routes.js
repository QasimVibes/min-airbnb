import { Router } from 'express'
import { createListing, getListing, deleteListing, updateListing, getListById ,getSingleUserList} from '../controllers/listing.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { validateCreateListing, handleValidationErrors } from "../middlewares/listValidation.middleware.js"
import { varifyJwt } from '../middlewares/auth.middleware.js'

const router = Router()


router.route("/list").get(getListing)

// Secure routes
router.use(varifyJwt)
router.route("/create").post(upload.single('image'), validateCreateListing, handleValidationErrors, createListing)
router.route("/list/:id").get(getListById)
router.route("/delete/:id").delete(deleteListing)
router.route("/update/:id").patch(upload.single('image'), validateCreateListing, handleValidationErrors, updateListing)
router.route("/userlist").get(getSingleUserList)

export default router