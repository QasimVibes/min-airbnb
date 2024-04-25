import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { Listing } from "./listing.models.js";
import { Wishlist } from "./wishlist.model.js";
import { cloudinary_delete } from "../utils/cloudinary.js";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true
        },
        refreshToken: {
            type: String
        }
    }, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    try {
        return this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        throw error
    }
})

userSchema.post("findOneAndDelete", async function (userId) {
    if (userId) {
        const listings = await Listing.find({ owner: userId._id }).select("-createdAt -updatedAt -__v -description -title -price -location -country -owner");
        for (const listing of listings) {
            const public_id = listing.image.split("/").pop().split(".")[0];
            await cloudinary_delete(public_id);
        }
        const listingIds = listings.map(listing => listing._id);
        await Wishlist.deleteMany({listing: { $in: listingIds } });
        await Listing.deleteMany({ owner: userId._id });
    }
});


userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

userSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign(
            {
                id: this._id,
                userName: this.userName,
                email: this.email
            },
            process.env.ACCESS_TOKEN
            , { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
    } catch (error) {
        throw error
    }
}

userSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign(
            {
                id: this._id,
            },
            process.env.REFRESH_TOKEN
            , { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
    } catch (error) {
        throw error
    }
}

export const User = mongoose.model("User", userSchema)