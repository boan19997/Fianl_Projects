//tạo biến database
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    imageURL: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    email_verified: {
      type: Boolean,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
    auth_time: {
      type: String,
      require: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song",
      },
    ],
    playlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
