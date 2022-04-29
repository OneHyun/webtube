import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  createdSocialLogin: { type: Boolean, default: false },
  username: { type: String, required: true },
  password: {
    type: String,
    required: function () {
      return !this.createdSocialLogin;
    },
  },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
const userModel = mongoose.model("User", userSchema);

export default userModel;
