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

// router.get('/search', (req, res) => {
//     if (!req.query.query || req.query == '')
//         res.render('blog/listBlogPosts');
//     else {
//         req.query.query = req.query.query.toLowerCase();
//         Post.find({$or: [   {title: {"$regex": req.query.query, "$options": "i"}}, 
//                             {categories: req.query.query}, 
//                             {keywords: req.query.query} ]}, 
//                             (err, posts) => {
//             if (err) {
//                 console.log(err);
//                 req.flash('danger', 'Error when searching posts');
//                 res.redirect('/');
//             }

//             if (posts) {
//                 res.render('blog/listBlogPosts', { posts });
//             } else {
//                 req.flash('danger', `No posts found with query ${req.query.query}`);
//                 res.redirect('/');
//             }
//         })
//     }
// });


module.exports = router;