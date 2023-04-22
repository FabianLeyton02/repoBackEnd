import mongoose from "mongoose";

export default async function mongoDBTest() {
  try {
    mongoose.connect("mongodb://localhost:27017//test");
  } catch (error) {
    throw new Error(error.message);
  }
}
