import { Router } from "express";
import businessController from "../controllers/business.controller.js";

class UserRouter {
  constructor() {
    this.router = Router();
    this.router.post("/", businessController.create);
    this.router.get("/:id", businessController.getOne);
    this.router.get("/", businessController.getMany);
    this.router.put("/:id", businessController.update);
    this.router.delete("/:id", businessController.delete);
  }

  getRouter() {
    return this.router;
  }
}

export default new UserRouter();
