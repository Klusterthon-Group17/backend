import { Router } from "express";
import UserController from "../../Controllers/users.controller";
const userController = new UserController();
const userRouter = Router();

userRouter.get('/users/:id', userController.getUser.bind(userController));
userRouter.delete('/delete/:id', userController.deleteUser.bind(userController));

export default userRouter;