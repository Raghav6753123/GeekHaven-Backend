import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { Questions } from "../Model/model.js";  // adjust path agar alag ho

dotenv.config();

const uri = process.env.MONGO_URI;

async function seedData() {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected...");
    const json = JSON.parse(fs.readFileSync("questions.json", "utf-8"));
    const data = json.data; 
    await Questions.deleteMany();
    console.log("Old data deleted");
    await Questions.insertMany(data);
    console.log("New data inserted");
        mongoose.connection.close();
        console.log("Seeding complete, connection closed.");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedData();
