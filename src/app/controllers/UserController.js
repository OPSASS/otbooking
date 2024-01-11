const { User } = require("../models/User");

class UserControler {
  index = async (req, res, next) => {
    const users = await User.findById(req.params.id);
    try {
      res.render("pages/user", {
        title: "Thông tin cá nhân",
        users,
      });
    } catch (error) {
      next(error);
    }
  };

  edit = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/profile/" + user.id);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      console.log("User deleted!");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new UserControler();
