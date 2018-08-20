'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');
var bodyParser = require('body-parser')
var urlRegex = require('url-regex')
var dns = require('dns')
var { URL } = require('url')

var Shorturl = require('./Shorturl')

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGO_URI)

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post('/api/shorturl/new', (req, res) => {
  const url = req.body.url
  
  if (!urlRegex({ exact: true}).test(url)) {
    res.json({ error: 'invalid URL' })
    return
  }
  
  dns.lookup(new URL(url).host, err => {
    if (err) {
      res.json({ error: 'unreachable URL' })
      return
    }
    Shorturl.findOne({ url }, (err, old) => {
      if (old) {
        res.sendStatus(500)
        return
      }
      if (old) {
        res.json({ original_url: old.url, short_url: old.shortUrl })
        return
      }
      const shorturl = new Shorturl({ url })
      shorturl.save((err, data) => {
        if (err) {
          res.sendStatus(500)
          return
        }
        res.json({ original_url: url, short_url: data.shortUrl })
      })
    })
  })
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});