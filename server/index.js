var http = require('http');
var ShareDB = require('sharedb');
var express = require('express');
var ShareDBMingoMemory = require('sharedb-mingo-memory');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
var WebSocket = require('ws');


// Start ShareDB
var share = new ShareDB({db: new ShareDBMingoMemory()});

// Create a WebSocket server
var app = express();
app.use(express.static('static'));
var server = http.createServer(app);
var wss = new WebSocket.Server({server: server});
server.listen(8080);
console.log('Listening on http://localhost:8080');