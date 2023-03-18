import { CRUD } from "../CRUD.js";
import { ProductModel } from "../../models/products.models.js";

class ProductMongo extends CRUD {
  constructor(model) {
    super(model);
  }
}

export default new ProductMongo(ProductModel);
