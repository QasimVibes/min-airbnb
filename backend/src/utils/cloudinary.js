import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'qasimrazzaq',
    api_key: '212268141693661',
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const cloudinary_upload = async (file) => {
    try {
        if (!file) return null
        const response =await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        })
        fs.unlinkSync(file)
        return response;
    } catch (error) {
        file && fs.unlinkSync(file)
        console.log("Error have been occuried wile uploading on cloudinary", error);
        return null
    }
}


const cloudinary_delete = async(public_id) => {
    try {
        if (!public_id) return null
        const response =await cloudinary.uploader.destroy(public_id);
        return response;
    } catch (error) {
        console.log("Error have been occuried wile deleting on cloudinary", error);
        return null
    }
}

export { cloudinary_upload, cloudinary_delete }