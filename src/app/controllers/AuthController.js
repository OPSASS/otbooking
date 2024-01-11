const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const passport = require("passport");
class SiteController {
  // GET /auth/register
  register(req, res) {
    res.render("pages/auth/register", {
      title: "Đăng ký",
    });
  }

  // POST /auth/register
  registerProcess = async (req, res, next) => {
    try {
      //tao token mat khau
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const cpassword = await bcrypt.hash(req.body.cpassword, salt);

      if (hashedPassword === cpassword) {
        //tao user
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          cpassword: cpassword,
          fullname: req.body.fullname,
          phone: req.body.phone,
          idtex: req.body.idtex,
          address: req.body.address,
          sex: req.body.sex,
        });

        //luu user
        const user = await newUser.save();
        res.redirect("/auth/login");
      } else {
        res.status(403).send("Mật khẩu không khớp");
      }
    } catch (error) {
      next(error);
    }
  };

  // GET /auth/login
  login(req, res) {
    res.render("pages/auth", {
      title: "Đăng nhập",
    });
  }

  // POST /auth/login
  loginProcess = async (req, res, next) => {
    passport.authenticate("user", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  };

  // GET /auth/reset
  reset(req, res) {
    res.render("pages/auth/reset", {
      title: "Lấy lại mật khẩu",
    });
  }

  // POST /auth/reset
  resetProcess = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const cpassword = await bcrypt.hash(req.body.cpassword, salt);
        if (hashedPassword === cpassword) {
          user.password = hashedPassword;
          user.cpassword = cpassword;
          await user.save();
          res.redirect("/auth/login");
        } else {
          res.status(403).send("Mật khẩu không khớp");
          res.redirect("/auth/reset");
        }
      } else {
        res.status(403).send("Username không tồn tại");
      }
    } catch (error) {
      next(error);
    }
  };

  logout = (req, res) => {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  };
}

module.exports = new SiteController();
