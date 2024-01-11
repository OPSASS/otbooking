const e = require("connect-flash");
const { Posts } = require("../models/Posts");

class PostsControler {
  index = async (req, res) => {
    res.render("pages/upload", {
      title: "Thêm phim",
    });
  };

  upload = async (req, res, next) => {
    try {
      const filesArray = [];
      req.files.forEach((e) => {
        const file = {
          fileName: e.filename,
          originalName: e.originalname,
          path: e.path,
          size: e.size,
        };
        filesArray.push(file);
      });
      const newPost = new Posts({ ...req.body, files: filesArray });

      await newPost.save();
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };

  single = async (req, res, next) => {
    try {
      const posts = await Posts.find({ slug: req.params.slug });

      res.render("pages/post", {
        title: posts[0].name,
        posts,
      });
    } catch {
      next(error);
    }
  };

  edit = async (req, res, next) => {
    try {
      const post = await Posts.findById(req.params.id);
      res.render("pages/edit-post", {
        title: "Sửa thông tin",
        post,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/movie/" + post.slug);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await Posts.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new PostsControler();
