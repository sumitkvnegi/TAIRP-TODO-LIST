import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
    },
    state: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
