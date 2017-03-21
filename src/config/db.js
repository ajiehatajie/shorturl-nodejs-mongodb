import mongoose from 'mongoose';
import config from './config';

const DBUri='mongodb://'+config.db.host+'/'+config.db.name;

import es6Promise from 'es6-promise';
mongoose.Promise = es6Promise.Promise;

mongoose.connect(DBUri);
mongoose.connection.on('connected',()=>{
    console.log('mongodb is connected '+ DBUri);
});

mongoose.connection.on('error',(err)=>{
    console.log('mongoDB error '+err);
});

mongoose.connection.on('disconnected',()=>{
    console.log(' mongodb is disconnected from '+ DBUri);
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});