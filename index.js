const express = require('express');
const app = express();
const port = 3000;
const gamesRouter = require('./routes/games');
const userRouter = require('./routes/user');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.use('/', gamesRouter);
app.use('/api/v1/users', userRouter)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    console.log(error)

    res.status(status).json({message: message, data: data})
});

app.listen(port, () => console.log(`Binar challenge app listening at http://localhost:${port}`))