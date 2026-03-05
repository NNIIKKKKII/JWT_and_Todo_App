import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {

    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connnected to ATLAS");

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;