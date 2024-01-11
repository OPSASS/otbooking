const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

// Posts Schema
const PostsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      max: 99,
      required: true,
    },
    desc: {
      type: String,
      max: 3000,
    },
    price: {
      type: String,
      default: 0,
    },
    type: {
      type: String,
      default: "Hành Động",
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    files: {
      type: Array,
    },
    status: {
      type: String,
    },
    trailer: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);
const Posts = mongoose.model("Posts", PostsSchema);

module.exports.Posts = Posts;
