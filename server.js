// Declare static folder to be served. It contains the JavaScript code, images, CSS, etc.
import express from 'express';
var app = express()

//setting middleware
app.use(express.static('public')); //Serves resources from public folder

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
    res.sendFile(__dirname + '/public/fleury.html');
    res.sendFile(__dirname + '/public/hierholzer.html');
    res.sendFile(__dirname + '/public/img/graph1.png');
    res.sendFile(__dirname + '/public/img/graph2.png');
})

var server = app.listen(3000);