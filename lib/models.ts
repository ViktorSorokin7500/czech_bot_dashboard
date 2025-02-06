import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  fullName: String,
  phone: Number,
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  declined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  photo: { type: String },
  gender: { type: String, enum: ["male", "female"] },
  age: { type: Number },
  city: { type: String },
  region: {
    type: String,
    enum: [
      "Praha",
      "Středočeský",
      "Jihočeský",
      "Plzeňský",
      "Karlovarský",
      "Ústecký",
      "Liberecký",
      "Královéhradecký",
      "Pardubický",
      "Vysočina",
      "Jihomoravský",
      "Olomoucký",
      "Zlínský",
      "Moravskoslezský",
    ],
  },
  professions: { type: String },
  expectedSalary: { type: Number },
  email: { type: String },
  checked: {
    type: String,
    enum: ["selected", "unselected"],
    default: "unselected",
  },
  language: { type: String, enum: ["ua", "pl"], default: "pl" },
  createdAt: { type: Date, default: Date.now },
});

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  salary: String,
  city: String,
  region: {
    type: String,
    enum: [
      "Praha",
      "Středočeský",
      "Jihočeský",
      "Plzeňský",
      "Karlovarský",
      "Ústecký",
      "Liberecký",
      "Královéhradecký",
      "Pardubický",
      "Vysočina",
      "Jihomoravský",
      "Olomoucký",
      "Zlínský",
      "Moravskoslezský",
    ],
    required: true,
  },
  responsibilities: [String],
  bonuses: [String],
  views: [{ type: Number, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export { User, Job };
