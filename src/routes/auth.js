const router = require("express").Router();
const authController = require("../app/controllers/AuthController");

// /auth/login
router.get("/login", authController.login);

// Login Process
router.post("/login", authController.loginProcess);

// Register Proccess
router.post("/register", authController.registerProcess);

// Reset password process
router.post("/reset", authController.resetProcess);

router.get("/logout", authController.logout);
module.exports = router;
