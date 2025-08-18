import { Questions, Users } from "../Model/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existing = await Users.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await Users.create({ name, email, password: hashed });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ message: "User registered", user: { id: user._id, name: user.name, email: user.email,token:token } });
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        console.log(user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({ token:token });
    } catch (err) {
        next(err);
    }
};
export const LoginWithOtp = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Found" });
        const otp = Math.floor(100000 + Math.random() * 900000);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "SigmaJEE Verification",
            text: "Here is your OTP: 123456",
            html: `<h1>Your OTP: ${otp}</h1>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });
        const EncryptedOtp = await bcrypt.hash(otp.toString(), 10);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({ message: "Otp Sent Successfully", EncryptedOtp: EncryptedOtp, token :token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const GetAllUsers = async (req, res) => {

    try {
        const AllUsers = await Users.find();
        return res.status(200).json(AllUsers);

    } catch (error) {
        return res.status(404).json("Error");
    }
}

