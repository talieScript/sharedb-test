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
server.listen(8085);
console.log('Listening on 8085');

// Connect any incoming WebSocket connection with ShareDB
wss.on('connection', function(ws) {
    console.log('New connection')
    var stream = new WebSocketJSONStream(ws);
    share.listen(stream);
});

var connection = share.connect();

// Create initial documents
var connection = share.connect();
connection.createFetchQuery('Data', {}, {}, function(err, results) {
  if (err) {
    throw err;
  }

    if (results.length === 0) {
        const form = { vessel: 'RMS Titanic', destination: [], windSpeed: 0};

        const doc = connection.get('forms', '');
        doc.create(form);
    }
});
