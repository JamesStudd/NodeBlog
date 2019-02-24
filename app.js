const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

let blog = require('./routes/blog');
app.use('/blog', blog);

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Home page');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

