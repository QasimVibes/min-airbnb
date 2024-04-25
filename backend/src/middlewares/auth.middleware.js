import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const varifyJwt = asyncHandler( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized user")
        }
        const varifyUser = jwt.verify(token, process.env.ACCESS_TOKEN)
        const user = await User.findById(varifyUser.id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "invalid access token")
        }

        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

export {varifyJwt}