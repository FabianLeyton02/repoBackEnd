import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

class UserRouter {
  constructor() {
    this.router = Router();
    this.router.get("/", userController.getUser);
    this.router.delete("/", userController.deleteUser);
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRouter();
