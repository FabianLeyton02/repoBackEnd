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

  async getUser(email) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("El usuario no existe");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserService();
