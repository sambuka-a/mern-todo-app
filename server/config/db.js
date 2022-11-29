import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_URL)
        console.log(`Mongo DB connected: ${connect.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB