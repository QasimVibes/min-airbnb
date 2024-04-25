import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: Boolean,
            default: true
        }
    }, { timestamps: true })

export const Wishlist = mongoose.model("Wishlist", wishlistSchema)