import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
  repoUrl: String,
  techStack: Object,
  dockerfile: String,
  createdAt: { type: Date, default: Date.now },
});

const Repo = mongoose.model("Repository", repoSchema);
export default Repo;
