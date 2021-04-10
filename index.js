const express = require('express');
const app = express();
const port = 3000;
const gamesRouter = require('./routes/games')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/', gamesRouter);
app.use(express.static('static'))

app.listen(port, () => console.log(`Binar challenge app listening at http://localhost:${port}`))