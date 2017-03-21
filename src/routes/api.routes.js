import express from 'express';
import Req from 'superagent';
import Url from '../models/Url';
import config from '../config/config';
import {encode,decode} from '../lib/base58';
import db from '../config/db';

const api = express.Router();

api.get('/shorten',(req,res) => 
{
    res.send('from api nodejs');
    console.log('log from api shorten');
});

api.post('/shorten',(req,res) => 
{
    const acceptsHTML = req.accepts('html');
    const acceptsJSON = req.is('application/json');
    const acceptsWEB  = req.is('application/x-www-form-urlencoded');
    const url_long    = req.body.url;
    const remoteAddress = req.connection.remoteAddress;
    
    console.log(req.is());
   
    if(acceptsJSON || acceptsWEB)
    {
            if(url_long)
            {
                Url.findOne({long_url:url_long},(err,doc)=>
                {
                    if(err) throw err;

                    if(doc)
                    {
                          let shortUrl = config.webhost + encode(doc._id);
                   
                          res.send({'shortUrl': shortUrl});
                          console.log('Long Url is Find '+ shortUrl);
                    }
                    else
                    {
                        /*
                        input data baru 
                        */
                        var NewData = Url({
                            long_url:url_long,
                            ip:remoteAddress
                        });

                        NewData.save((err,data) => 
                        {
                            if(err) console.log(err);
                            
                            let shortUrl = config.webhost + encode(data._id);
                            res.setHeader('content-type', 'application/json');
                            res.send({'shortUrl': shortUrl});
                            res.status(200);
                            console.log('new Data to Insert MongoDB : ' + shortUrl);
                      
                        });

                      
                    }
                  
                });
            }
            
    }
    else
    {
        console.log("format bukan JSON jadi di tolak");
        res.status(400).json({data:{"error":400,"message":"salah tipe om cek deui"}}) ;
    }
 
});

export default api;