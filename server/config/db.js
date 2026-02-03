import mongoose from "mongoose";

// connect to DB
const connectDB = async ()=>{
    mongoose.connection.on('connected',() =>console.log('Database connnected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}
export default connectDB;