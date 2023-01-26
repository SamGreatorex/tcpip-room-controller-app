const config = require('./config.js');
const Net = require('net');
const port = config.port;
const api = require('./api.js');

const server = new Net.Server();

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');
    
    socket.write('Connected');

    socket.on('data', function(chunk) {

        var jchunk = JSON.parse(chunk.toString());
        console.log('jChunk', jchunk);
        console.log('Sending Message:', jchunk)
        api.sendMessage(jchunk);
    });

    socket.on('end', function() {
        console.info('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.error(`Error: ${err}`);
    });
});