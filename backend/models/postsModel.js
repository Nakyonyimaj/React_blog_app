const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    photo: { type: String, required: false },
    postCap: { type: String, required: true },
    username: {
      type: String,
      required: true,
    },
    userPic:{type:String,required:false}
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
