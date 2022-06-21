import http from 'http';
import morgan from 'morgan'
import cors from 'cors';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';
import "dotenv/config";

import userRoutes from './routes/user';
import blogRoutes from './routes/blog';

const router = express();


/** Server Handling */
const httpServer = http.createServer(router);

router.use(cors());
router.use(morgan(':method :url :status'));
require('dotenv').config()

/** Connect to Firebase */
let serviceAccount = require('./config/serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

/** Connect to Mongo */
mongoose.connect(
    config.db.connectionUrl,

    (error) => {
        if (error) {
            console.log('Connection to MongoDB failed');
            return;
        }
        console.log('Connected to Mongo');
        httpServer.listen(1337, () => console.log('Appliaction server is running on: http://localhost:1337'));
    },
);

/** Log the request */
router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

/** Parse the body of the request */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Rules of my API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

