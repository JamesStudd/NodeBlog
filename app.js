const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const expressValidator = require("express-validator");
const session = require("express-session");

const port = process.env.PORT || 5000;

// Routes
let blog = require("./routes/blog");
let projects = require("./routes/projects");
let search = require("./routes/search");
let about = require("./routes/about");

// Project model
const Project = require("./database/models/projectModel");
const Post = require("./database/models/postModel");

// Some locals to use in pug templating
app.locals.titles = {};
app.locals.moment = require("moment");

// Express App Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Express Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express validator middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }

      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Express passport middleware
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// App Routes
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  Project.find({}, (err, projects) => {
    let titles = {};
    projects.forEach(project => {
      titles[project.title] = project.link;
    });
    app.locals.titles = titles;
    next();
  });
});

// App routing
app.use("/blog", blog);
app.use("/projects", projects);
app.use("/search", search);
app.use("/about", about);

app.get("/", (req, res) => {
  res.send("Hello World");
  // let promises = [];
  // promises.push(findLatest(Post));
  // promises.push(findLatest(Project));
  // Promise.all(promises)
  //   .then(result => {
  //     res.render("home", {
  //       post: result[0],
  //       project: result[1]
  //     });
  //   })
  //   .catch(err => {
  //     res.render("home");
  //   });
});

const findLatest = Document => {
  return new Promise((resolve, reject) => {
    Document.findOne({}, {}, { sort: { date: -1 } }, (err, foundDoc) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (foundDoc) {
        resolve(foundDoc);
      } else {
        resolve(undefined);
      }
    });
  });
};

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/");
});

app.get("/hc", (req, res) => {
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
