import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb_url').then(()=>console.log("DB Bağlandı"));
}

//mongodb+srv://nordo:nordo@55@cluster0.ftxeelc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
