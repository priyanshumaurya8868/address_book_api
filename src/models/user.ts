import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface I_UserDocument extends mongoose.Document {
  name: string;
  password: string;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
});
const saltRounds = 10;
UserSchema.pre("save", async function (this: I_UserDocument, next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);

export default UserModel;