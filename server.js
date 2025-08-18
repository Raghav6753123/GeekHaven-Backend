import e from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import Authrouter from "./Routes/Authroutes.js"
import QuestionRouter from "./Routes/QuestionRoutes.js"
const app = e()
dotenv.config()
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin:"http://localhost:5173/",
    Credential:true
}));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use("/api/auth", Authrouter);
app.use("/api/ques",QuestionRouter);
const uri = process.env.MONGO_URI;
mongoose.connect(uri).then(async () => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})


