# Node Blog / Portfolio

This website serves as my blog which I try to regularly update with the current project I am working on, as well as my list of finished projects acting as my portfolio. The website was initially using Jekyll and Github Pages but I decided I wanted more control over how the system worked so eventually wrote my own. As Jekyll is a static site generator, I didn't really like the process of adding a new post - pulling, making changes, building, committing, pushing - so I feel this more dynamic approach suits my programming style. This was all done using: Node, Express, Mongoose, Pug, Showdown and Heroku.   

'Posts' and 'Projects' are both saved into MongoDB tables with their respective markdown and HTML formats. I decided to save both formats as I felt it important to keep a copy of the original data passed in, as well as also reducing the time taken to serve up a website since it wouldn't need to convert the markdown -> html each time a page is loaded.  
Going to either the GET route /blog/NameOfPost or /projects/NameOfProjects will search through the correct MongoDB table, grab the right document and pass it through to PugJS and render it to the user, as well as also using some layouts such as the navigation bar, main page template, and footer. All of the styling is done using a mixture of Bootstrap and some custom CSS, this maybe eventually changed to SCSS/SASS but the size of the project didn't really justify making that change.  
The website is hosted on Heroku using the free hosting that they offer. MLab is used for the MongoDB deployment.
 
Changing to using a familiar language/framework means that I can add any sort of feature I think of, whereas before I was limited by the Jekyll theme I was using and the unfamiliarity with Ruby. One of the features I was able to implement was an instant markdown conversion to show how my blog post will eventually look:  
![InstantConverter](https://i.imgur.com/4GnKiEc.gif)  
