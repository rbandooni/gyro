const express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
// var routes = require('./routes');
const port = process.env.PORT || 3000;
const app = express();
var path = require('path');

app.set('views', __dirname +'/views');
app.use(express.static('views'))
app.use('/scripts', express.static(__dirname + '/node_modules/socket.io-client/dist'));
// app.use(app.router);

app.get('/', (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress ;
    console.log(ip);
    res.setHeader('Access-Control-Allow-Origin', '*') ;

    res.sendFile('index.html');
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var server = http.createServer(app),
io = require('socket.io').listen(server);

server.listen(port, ()=> {
    console.log('Express server running on port '+ port);
})


io.sockets.on('connection', (client)=> {
    console.log('Socket connected!');

    client.on('devicemove', (data)=> {
        console.log('Device move!');
        console.log(data);
        client.broadcast.emit('movesquare', data);

        // client.on('changeImage')
    })
});
