const express = require('express');
const app = express();
const port = 3000;
const router = require('./router')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(express.static('static'))

app.listen(port, () => console.log(`Binar challenge app listening at http://localhost:${port}`))