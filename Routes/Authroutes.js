import { Router } from "express";
import { rateLimiter } from "../middleware/MiddleWare.js";
import {  GetAllUsers, loginUser, LoginWithOtp, registerUser } from "../Controller/AuthController.js";
const Authrouter = Router();
Authrouter.post("/login", rateLimiter,loginUser);
Authrouter.post("/login-otp", rateLimiter,LoginWithOtp);
Authrouter.post("/register", rateLimiter,registerUser);
export default Authrouter;
