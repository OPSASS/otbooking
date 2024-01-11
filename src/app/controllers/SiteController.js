const { Posts } = require("../models/Posts");
const { User } = require("../models/User");
class SiteController {
  index = async (req, res) => {
    const posts = await Posts.find().sort({
      createdAt: -1,
    });
    res.render("pages/home/index", {
      title: "Trang chủ",
      posts,
    });
  };

  err = (req, res) => {
    res.render("pages/404/404", {
      title: "404",
    });
  };
}

module.exports = new SiteController();
