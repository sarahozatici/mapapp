const http = require('http');
var fs = require('fs');
var parse = require('csv-parse');
const express = require('express')
const app = express()
const port = 3000

var inputFile='GeoLite2-City-Blocks-IPv4.csv';

var csvData=[];
fs.createReadStream(inputFile)
    .pipe(parse())
    .on('data', function(data) {
       var entry = {};
       entry.longitude = data[7];
       entry.latitude = data[8];
        csvData.push(entry);        
    })
    .on('end',function() {
      console.log(csvData);
    });
    
app.get('/', (req, res) => res.send("Hello world!"))
app.get('/endpoints', (req, res) => res.send(csvData))


app.listen(port, () => console.log(`App ${port}!`))