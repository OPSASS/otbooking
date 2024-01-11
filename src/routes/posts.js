const express = require("express");
const router = express.Router();

const { upload } = require("../middleware/multer");

// Add Route
const PostsController = require("../app/controllers/PostsController");

// render
// post index
// /movie/them-movie
router.get("/add", ensureAuthenticated, PostsController.index);

// Post files form to server
// POST /movie/them-movie
router.post(
  "/add",
  upload.array("files"),
  ensureAuthenticated,
  PostsController.upload
);

// /movie/:slug
router.get("/:slug", PostsController.single);

// Load Edit Form
// GET /movie/:id/edit
router.get("/:id/edit", ensureAuthenticated, PostsController.edit);

// Update
// PUT /movie/:id/edit
router.put("/:id/edit", ensureAuthenticated, PostsController.update);

// Delete Posts
// DELETE /movie/:id/delete
router.delete("/:id/delete", ensureAuthenticated, PostsController.delete);

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
}

module.exports = router;
