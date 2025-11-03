import { Router } from "express";
import { signup } from "../controllers/user.controller.js";

const userRouter = Router()


userRouter.route("/signup").post(signup)


export default userRouter