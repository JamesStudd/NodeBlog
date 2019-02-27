const express = require('express');
const { check, validationResult } = require('express-validator/check');
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

router.post('/addproject', [

    // Middleware
    ensureAuthenticated,
    check('title').not().isEmpty().withMessage('Title is required'),
    check('shortDescription').not().isEmpty().withMessage('Short Description is required'),
    check('longDescription').not().isEmpty().withMessage('Long Description is required'),
    check('image').not().isEmpty().withMessage('Image is required'),
    check('image').isURL().withMessage('Image needs to be a link'),
    check('title').custom((title) => {
        return Project.findOne({title: title}).then((project) => {
            if (project) {
                return Promise.reject('Title is already in use');
            }
        })
    })

    ], (req, res) => {   

    let errors = validationResult(req);

    if (errors.array().length > 0) {
        for (let i = 0; i < errors.array().length; i++) {
            req.flash('danger', errors.array()[i].msg);
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
        projectData.parsedHtml = html;

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
            res.render('singleDocView', {
                document: project,
                type: 'projects'
            });
        } else {
            res.status(404).send();
        }
    })
});

router.post('/:title', ensureAuthenticated, (req, res) => {
    Project.deleteOne({title: req.params.title}, (err) => {
        if (err) {
            req.flash('danger', 'Failed to delete project');
        } else {
            req.flash('success', 'Project deleted');
        }
        res.redirect('/');
    })
})

module.exports = router;