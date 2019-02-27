require('./config/databaseConfig');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
const session = require('express-session');

const port = process.env.PORT || 3000;

// Routes
let blog = require('./routes/blog');
let projects = require('./routes/projects');
let search = require('./routes/search');

// Project model
const Project = require('./database/models/projectModel');

// Some locals to use in pug templating
app.locals.titles = [];
app.locals.moment = require('moment');

// Express App Setup
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Express passport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// App Routes
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    Project.find({}, (err, projects) => {
        app.locals.titles = [];
        projects.forEach((project) => {
            if (!app.locals.titles.includes(project.title))
                app.locals.titles.push(project.title)
        }); 
        next();
    });
});

// App routing
app.use('/blog', blog);
app.use('/projects', projects);
app.use('/search', search);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out');
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

