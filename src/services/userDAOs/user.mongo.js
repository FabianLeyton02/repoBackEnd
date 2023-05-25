import bcrypt from "bcrypt";
import { UserModel } from "../../models/user.models.js";

class UserService {
  async createUser(data) {
    try {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
      const response = await UserModel.create(data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser() {
    try {
      await UserModel.deleteMany();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserService();
