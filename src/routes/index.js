const authRouter = require("./auth");
const postsRouter = require("./posts");
const siteRouter = require("./site");

// use the express router
function Route(app) {
  app.use("/auth", authRouter);

  app.use("/movie", postsRouter);

  app.use("/", siteRouter);
}

module.exports = Route;
