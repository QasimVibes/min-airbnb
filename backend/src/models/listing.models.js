import mongoose from 'mongoose'
import { Wishlist } from "./wishlist.model.js";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    geolocation: {
        latitude: {
            type: Number,
            required: [true, 'Latitude is required']
        },
        longitude: {
            type: Number,
            required: [true, 'Longitude is required']
        }
    }
}, { timestamps: true })

listingSchema.post('findOneAndDelete', async function (list) {
    await Wishlist.deleteMany({ listing: list._id });
})



export const Listing = mongoose.model('Listing', listingSchema)