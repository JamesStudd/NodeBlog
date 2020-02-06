const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const ensureAuthenticated = require("./../auth/verify");
const convert = require("./../utils/convert");

const Post = require("./../database/models/postModel");

router.get("/", (req, res) => {
  Post.find({}, {}, { sort: { date: -1 } }, (err, posts) => {
    res.send(posts);
  });
});

router.get("/addpost", ensureAuthenticated, (req, res) => {
  res.render("blog/addNewPost");
});

router.post(
  "/addpost",
  [
    // Middleware
    ensureAuthenticated,
    check("body")
      .not()
      .isEmpty()
      .withMessage("Body is required"),
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required"),
    check("title").custom(title => {
      return Post.findOne({ title: title }).then(post => {
        if (post) {
          return Promise.reject("Title is already in use");
        }
      });
    })
  ],
  (req, res) => {
    res.send("Coming soon");
  }
);

router.get("/:title", (req, res) => {
  Post.findOne({ link: convert.toLink(req.params.title) }, (err, post) => {
    if (err) {
      return res.status(500).send();
    }

    if (post) {
      res.render("singleDocView", {
        document: post,
        type: "blog"
      });
    } else {
      res.status(404).send();
    }
  });
});

router.post("/:title", ensureAuthenticated, (req, res) => {
  Post.deleteOne({ link: convert.toLink(req.params.title) }, err => {
    if (err) {
      req.flash("danger", "Failed to delete post");
    } else {
      req.flash("success", "Post deleted");
    }
    res.redirect("/");
  });
});

module.exports = router;
