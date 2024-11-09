import mongoose from "mongoose";

const generatedImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: false,
  },
});

export default mongoose.models.GeneratedImage ||
  mongoose.model("GeneratedImage", generatedImageSchema);
