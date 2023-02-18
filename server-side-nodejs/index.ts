require('dotenv').config();

import express, {Request, Response} from 'express';
// const morgan = require('morgan');
// const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
// const cookieParser = require ('cookie-parser');

const app = express();

// app.use(morgan('combined'));
// app.use(helmet());
app.use(express.json());
app.use(cors());
// app.use(cookieParser())

import moviesRouter from './routes/movies';

mongoose.connect(`mongodb://admin:admin@127.0.0.1:27017/filmbook`, {
    useNewUrlParser: true
}, (error: any) => {
    if (error) {
        console.log('Error:' + error);
    } else {
        console.log("DB connect");
    }
});

app.get('/', (request: Request, response: Response): void => {
    response.status(200).send('Hello World !');
});

app.use('/movies', moviesRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server Running on http://localhost:4500`);
});