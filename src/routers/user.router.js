import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

class UserRouter {
  constructor() {
    this.router = Router();
    this.router.post("/", userController.createUser);
    this.router.get("/:email", userController.getUser);
    this.router.put("/updateUser/:email", auth, userController.updateUser);
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRouter();
