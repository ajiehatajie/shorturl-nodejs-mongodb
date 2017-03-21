import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';

//import file routes

import api from './routes/api.routes';
import web from './routes/web.routes';
import config from './config/config';

//end import file

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.use('/',web);
app.use('/api',api);



app.listen(config.port)
console.log('listen '+config.webhost)