import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 50,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
})

const Auth = mongoose.model("Auth", authSchema);

export default Auth;