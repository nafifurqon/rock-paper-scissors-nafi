const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/', async (req, res) => {
    try {
        const url = req.originalUrl;

        res.status(200).render('admin/index', { url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = adminRouter;