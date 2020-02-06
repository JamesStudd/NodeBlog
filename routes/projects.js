const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const ensureAuthenticated = require("./../auth/verify");
const convert = require("./../utils/convert");

const Project = require("./../database/models/projectModel");

router.get("/", (req, res) => {
  Project.find({}, {}, { sort: { date: -1 } }, (err, projects) => {
    res.send(projects);
  });
});

router.get("/addproject", ensureAuthenticated, (req, res) => {
  res.render("project/addNewProject");
});

router.post(
  "/addproject",
  [
    // Middleware
    ensureAuthenticated,
    check("title")
      .not()
      .isEmpty()
      .withMessage("Title is required"),
    check("shortDescription")
      .not()
      .isEmpty()
      .withMessage("Short Description is required"),
    check("longDescription")
      .not()
      .isEmpty()
      .withMessage("Long Description is required"),
    check("image")
      .not()
      .isEmpty()
      .withMessage("Image is required"),
    check("image")
      .isURL()
      .withMessage("Image needs to be a link"),
    check("title").custom(title => {
      return Project.findOne({ title: title }).then(project => {
        if (project) {
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
  Project.findOne(
    { link: convert.toLink(req.params.title) },
    (err, project) => {
      if (err) {
        return res.status(500).send();
      }

      if (project) {
        res.render("singleDocView", {
          document: project,
          type: "projects"
        });
      } else {
        res.status(404).send();
      }
    }
  );
});

router.post("/:title", ensureAuthenticated, (req, res) => {
  Project.deleteOne({ link: convert.toLink(req.params.title) }, err => {
    if (err) {
      req.flash("danger", "Failed to delete project");
    } else {
      req.flash("success", "Project deleted");
    }
    res.redirect("/");
  });
});

module.exports = router;
