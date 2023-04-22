import mongoose from "mongoose";
import { ProductRepository } from "../src/services/productDAOs/repository.js";
import Assert from "assert";
import mongoDBTest from "./dbtest.js";

const assert = Assert.strict;
describe("Testing Product", () => {
  before(async () => await mongoDBTest());
  after(async () => {
    mongoose.connection.close();
  });
  it("Test debe devolver tal cosa", () => {
    const product = new ProductRepository();
    const result = product.getMany();
    assert.strictEqual(Array.isArray(result), true);
  });
});
