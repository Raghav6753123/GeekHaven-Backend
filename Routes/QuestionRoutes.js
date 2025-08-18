import { Router } from "express";
import { GetAllQuestions } from "../Controller/QuestionController.js";
const QuestionRouter = Router();
QuestionRouter.get("/get-ques",GetAllQuestions);
export default QuestionRouter;