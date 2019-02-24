const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

let blog = require('./routes/blog');

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/blog', blog);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

