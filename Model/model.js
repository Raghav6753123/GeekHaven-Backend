import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
export const Users = mongoose.model("Users", userSchema);
const quesItemSchema = new mongoose.Schema({
    id: { type: String, default: null },
    tags: { type: String, default: "" },
    title: { type: String, default: null },
    yt_link: { type: String, default: null },
    p1_link: { type: String, default: null },
    p2_link: { type: String, default: null },
});

const questionsSchema = new mongoose.Schema({
    sl_no: { type: Number, required: true },
    title: { type: String, required: true },
    ques: [quesItemSchema]
});

export const Questions = mongoose.model("Questions", questionsSchema);