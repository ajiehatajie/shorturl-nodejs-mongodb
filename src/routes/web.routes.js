import express from 'express';
import {decode} from '../lib/base58';
import Url from '../models/Url';
import config from '../config/config';
const web = express.Router();

web.get('/',(req,res) =>
{
    res.render('index');
    console.log('get from web routes /')
});

web.get('/:encoded_id',(req,res)=>
{
    
  const base58Id = req.params.encoded_id;

  const id = decode(base58Id);
    
    // check if url already exists in database
  Url.findOne({_id: id},(err, doc) => 
  {
    if (doc)
    {
      res.redirect(doc.long_url);
      console.log("Users Access Short Url byID : "+base58Id+" To Long Url "+doc.long_url );
    } else {
      res.redirect(config.webhost);
      console.log("Short URL not Found And redirect to HOme");
    }
  });

});

export default web;
