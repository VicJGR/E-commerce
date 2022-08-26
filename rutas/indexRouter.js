import express from 'express';

const router = express.Router();


router.get('/', function (req, res, next) {
    res.end("Tonto el que lo lea");
    });


export default router;
