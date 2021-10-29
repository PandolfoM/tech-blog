const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "description", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true, onDashboard: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new-post", (req, res) => {
  res.render("new-post", { loggedIn: true, onDashboard: true });
});

module.exports = router;
