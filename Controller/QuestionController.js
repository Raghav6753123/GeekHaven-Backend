import { Questions } from "../Model/model.js";
export const GetAllQuestions = async (req, res) => {
     try {
        const AllQues = await Questions.find();
        return res.status(200).json({ques:AllQues});

    } catch (error) {
        return res.status(404).json("Error");
    }
}