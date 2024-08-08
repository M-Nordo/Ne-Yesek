import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nordo:nordo%4055@cluster0.ftxeelc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Bağlandı"));
}

//mongodb+srv://nordo:nordo@55@cluster0.ftxeelc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0