import { Schema, model } from "mongoose";
let PostSchema = new Schema({
  updateAt: Date,
  createdAt: Date,
  title: {
    type: String,
    default: "",
    required: true
  }
});

export default model("Post", PostSchema);
