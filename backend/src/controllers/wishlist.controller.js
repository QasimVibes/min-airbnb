import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Wishlist } from "../models/wishlist.model.js";
import { isValidObjectId } from "mongoose";


const createWishlist = asyncHandler(async (req, res) => {
    const { listing } = req.params;

    if (!isValidObjectId(listing)) {
        throw new ApiError(400, "Invalid listing id");
    }
    const existingWishlist = await Wishlist.findOne({ owner: req.user?._id, listing });

    if (existingWishlist && existingWishlist.owner.equals(req.user?._id)) {
        await Wishlist.findByIdAndDelete(existingWishlist._id);
        return res.status(200).json(new ApiResponse(200, "Existing wishlist entry deleted successfully"));
    }
    const wishlist = await Wishlist.create({
        owner: req.user?._id,
        listing
    });

    if (!wishlist) {
        throw new ApiError(400, "Failed to create wishlist entry");
    }
    res.status(200).json(new ApiResponse(201, "Wishlist created successfully"))


})

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.find({ owner: req.user?._id }).populate("listing")
    if (!wishlist) {
        throw new ApiError(400, "Wishlist not found")
    }
    res.status(200).json(new ApiResponse(201, "Wishlist fetched successfully", wishlist))
})

export { createWishlist, getWishlist }
