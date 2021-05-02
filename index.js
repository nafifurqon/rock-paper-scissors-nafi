const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const {
    adminRouter,
    gamesRouter,
    userRouter,
} = require('./routes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use('/sb-admin-2', express.static('node_modules/startbootstrap-sb-admin-2'));

app.use('/', gamesRouter);
app.use('/api/v1/users', userRouter)
app.use('/admin', adminRouter);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    console.log(error)

    res.status(status).json({ message: message, data: data })
});

app.listen(port, () => console.log(`Binar challenge app listening at http://localhost:${port}`))