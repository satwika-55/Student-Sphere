import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },

        text : {
          type: String,
          required: true,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);