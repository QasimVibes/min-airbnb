import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token and refresh token")
    }
}

const createUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body
    const alreadyExist = await User.findOne({
        email: email
    })

    if (alreadyExist) {
        throw new ApiError(400, "User already exist")
    }

    const user = await User.create({
        userName,
        email,
        password
    })
    if (!user) {
        throw new ApiError(400, "Failed to create user")
    }

    res.status(200).json(new ApiResponse(201, "User created successfully"))
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        throw new ApiError(400, "User not found")
    }

    const isPasswordMatch = await user.isValidPassword(password)
    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateToken(user._id)

    const loggedInUser = user.toObject()
    delete loggedInUser.refreshToken
    delete loggedInUser.password

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    res.status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(201, "Logged in successfully", { user: loggedInUser, refreshToken, accessToken },))

})


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true
        }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    res.status(200)
        .clearCookie("refreshToken", cookieOptions)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(201, "Logged out successfully"));
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(201, "User fetched successfully", req.user))
})



const deleteUser = asyncHandler(async (req, res) => {
    const { password } = req.body
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isPasswordMatch = await user.isValidPassword(password)
    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid password")
    }
    const deletedUser = await User.findByIdAndDelete(user._id)
    if (!deletedUser) {
        throw new ApiError(400, "Failed to delete user")
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    res.status(200)
        .clearCookie("refreshToken", cookieOptions)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(201, "User deleted successfully"))
})


export { createUser, loginUser, logoutUser, getCurrentUser, deleteUser }