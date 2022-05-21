// var http = require('http'),
//     fs = require('fs');


// fs.readFile('house_of_lines.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8000);
// });
// Declare static folder to be served. It contains the JavaScript code, images, CSS, etc.
import express from 'express';
var app = express()

//setting middleware
app.use(express.static('public')); //Serves resources from public folder

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
    res.sendFile(__dirname + '/public/fleury.html');
    res.sendFile(__dirname + '/public/hierholzer.html');
    res.sendFile(__dirname + '/public/euler.html');
})

var server = app.listen(3000);