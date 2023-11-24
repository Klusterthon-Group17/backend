import { Router } from "express";
import UserController from "../../Controller/UserController";
const userController = new UserController();
const userRouter = Router();

userRouter.get('/users/:id', userController.getUser.bind(userController));
userRouter.delete('/delete/:id', userController.deleteUser.bind(userController));

export default userRouter;