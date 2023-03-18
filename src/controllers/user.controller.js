import factory from "../services/factory.js";
import { STATUS } from "../constants/constants.js";

class UserController {
  async createUser(req, res) {
    try {
      const data = req.body;
      const response = await factory.user.createUser(data);
      res.status(201).json({ user: response, status: STATUS.SUCCESS });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }

  async getUser(req, res) {
    try {
      const { email } = req.params;
      const response = await factory.user.getUser(email);
      res.status(200).json({ user: response, status: STATUS.SUCCESS });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { email } = req.params;
      const { body } = req;
      const user = await factory.user.updateUser(email, body);
      res.json({ user });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserController();
