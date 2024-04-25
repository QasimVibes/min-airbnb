import { Router } from 'express'
import { createWishlist,getWishlist } from '../controllers/wishlist.controller.js'
import { varifyJwt } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(varifyJwt)

router.route("/create/:listing").post(createWishlist)
router.route("/get").get(getWishlist)



export default router
