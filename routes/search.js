const express = require('express');
const router = express.Router();

const Post = require('./../database/models/postModel');
const Project = require('./../database/models/projectModel');

router.get('/', (req, res) => {
    let promises = [];

    if (!req.query.blog && !req.query.project || !req.query.query || req.query.query == '')
        return res.redirect('/');
    
    if (!!req.query.blog)
        promises.push(findDocs(Post, req.query.query))
    
    if (!!req.query.project)
        promises.push(findDocs(Project, req.query.query))
    
    Promise.all(promises)
        .then((result) => {
            res.render('search/results', {
                posts: result[0],
                projects: result[1]
            })
        })
        .catch((err) => {
            req.flash('danger', 'Error in finding blogs and projects.');
            res.redirect('/');
        })
});

const findDocs = (Document, param) => {
    return new Promise((resolve, reject) => {
        Document.find({$or: [    {title: {"$regex": param, "$options": "i"}},
                                {categories: param},
                                {keywords: param} ]},
                                (err, foundDocs) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (foundDocs) {
                resolve(foundDocs);
            } else {
                reject();
            }
        })
    });
}

module.exports = router;