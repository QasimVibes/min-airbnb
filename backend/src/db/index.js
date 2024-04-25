import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DATABASE_URL}/${DATABASE_NAME}`)
    } catch (error) {
        console.log("Erorr while connecting to database: ", error)
        process.exit(1)
    }
}