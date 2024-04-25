import { Listing } from "../models/listing.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinary_delete, cloudinary_upload } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";
import NodeGeocoder from 'node-geocoder';
import fs from "fs"

const createListing = asyncHandler(async (req, res) => {
    const { title, description, price, location, country } = req.body
    const image = req.file?.path
    if (!image) {
        throw new ApiError(400, "Image is required")
    }
    const alreadyExist = await Listing.findOne({ title })
    if (alreadyExist) {
        fs.unlinkSync(image)
        throw new ApiError(400, "Listing already exist")
    }
    const imageupload = await cloudinary_upload(image)
    const options = {
        provider: 'openstreetmap',
    };

    const geocoder = NodeGeocoder(options);
    const address = `${location}, ${country}`
    const results = await geocoder.geocode(address);
    const { latitude, longitude } = (results && results.length > 0) ? results[0] : { latitude: 40.0583, longitude: -74.4057 };
    const listing = await Listing.create({
        title,
        description,
        price,
        location,
        image: imageupload.secure_url,
        country,
        owner: req.user?._id,
        geolocation: {
            latitude,
            longitude
        }
    })
    if (!listing) {
        throw new ApiError(400, "Failed to create listing")
    }
    res.status(200).json(new ApiResponse(201, "Listing created successfully"))
})

const getListing = asyncHandler(async (req, res) => {
    const listings = await Listing.find({}).select("-createdAt -updatedAt -__v -description")

    if (!listings) {
        throw new ApiError(404, "No listing found")
    }
    res.status(200).json(new ApiResponse(201, "Listing fetched successfully", listings))
})

const getListById = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid listing id")
    }
    const listing = await Listing.findById(id)
    if (!listing) {
        throw new ApiError(404, "Listing not found")
    }
    res.status(200).json(new ApiResponse(201, "Listing fetched successfully", listing))
})

const deleteListing = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid listing id")
    }
    const { owner } = await Listing.findById(id)
    if (!owner.equals(req.user?._id)) {
        throw new ApiError(400, "You are not authorized to delete this listing")
    }
    const listing = await Listing.findByIdAndDelete(id)
    if (!listing) {
        throw new ApiError(404, "Listing not found")
    }
    const public_id = listing.image?.split("/").pop().split(".")[0]
    await cloudinary_delete(public_id)
    res.status(200).json(new ApiResponse(201, "Listing deleted successfully"))
})

const updateListing = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;

    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid listing id");
    }
    const { owner } = await Listing.findById(id);
    if (!owner.equals(req.user?._id)) {
        throw new ApiError(400, "You are not authorized to update this listing");
    }
    const previousListing = await Listing.findById(id);
    if (!previousListing) {
        throw new ApiError(404, "Listing not found");
    }

    const public_id = previousListing.image.split("/").pop().split(".")[0];
    const localPath = req.file?.path;
    localPath ? await cloudinary_delete(public_id) : null;
    const image = localPath ? await cloudinary_upload(localPath) : null;
    const options = {
        provider: 'openstreetmap',
    };
    const geocoder = NodeGeocoder(options);
    const address = `${location}, ${country}`
    const results = await geocoder.geocode(address);
    const { latitude, longitude } = (results && results.length > 0) ? results[0] : { latitude: 40.0583, longitude: -74.4057 };
    const updatedListing = await Listing.findByIdAndUpdate(id, {
        title,
        description,
        price,
        location,
        image: image?.secure_url || previousListing.image,
        country,
        geolocation: {
            latitude,
            longitude
        }
    }, { new: true });
    if (!updatedListing) {
        throw new ApiError(400, "Failed to update listing");
    }

    res.status(200).json(new ApiResponse(201, "Listing updated successfully"));

})

const getSingleUserList = asyncHandler(async (req, res) => {
    const list = await Listing.find({ owner: req.user?._id })
    if (!list) {
        throw new ApiResponse(400, "No listing found")
    }
    res.status(200).json(new ApiResponse(201, "Listing fetched successfully", list))
})


export { createListing, getListing, deleteListing, updateListing, getListById, getSingleUserList }