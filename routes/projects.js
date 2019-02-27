const express = require('express');
const router = express.Router();
const showdown = require('showdown');
const converter = new showdown.Converter();

const Project = require('./../database/models/projectModel');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Unauthorized');
        res.redirect('/');
    }
}

router.get('/', (req, res) => {
    Project.find({}, (err, projects) => {
        res.render('project/listProjects', {
            projects
        });
    })
});

router.get('/addproject', ensureAuthenticated, (req, res) => {
    res.render('project/addNewProject');
})

router.post('/addproject', (req, res) => {   
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('shortDescription', 'Short Description is required').notEmpty();
    req.checkBody('longDescription', 'Long Description is required').notEmpty();
    req.checkBody('image', 'Image is required').notEmpty();
    req.checkBody('image', 'Image needs to be a link').isURL();

    let errors = req.validationErrors();

    if (errors) {
        for (let i = 0; i < errors.length; i++) {
            req.flash('danger', errors[i].msg);
        }
        res.render('project/addNewProject');
    } else {
        if (req.body.categories) {
            req.body.categories = req.body.categories.split(',');
        }

        if (req.body.keywords) {
            req.body.keywords = req.body.keywords.split(',');
        }

        let projectData = new Project(req.body);

        let html = converter.makeHtml(projectData.longDescription);
        projectData.parsedLongDescription = html;

        projectData.save().then(result => {
            req.flash('success', 'Project added');
            res.redirect('/');
        }).catch(err => {
            console.log(err);
            res.status(400).send('Unable to save data');
        });
    }
});

router.get('/:title', (req, res) => {
    Project.findOne({title: req.params.title}, (err, project) => {
        if (err) {
            return res.status(500).send();
        }

        if (project) {
            res.render('project/singleProject', {
                project
            });
        } else {
            res.status(404).send();
        }
    })
})

module.exports = router;