const config = require('./config.js');
const Net = require('net');
const port = config.port;


const server = new Net.Server();

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');
    
    socket.write('Connected');

    socket.on('data', function(chunk) {

        var jchunk = JSON.parse(chunk.toString());

        if (typeof jchunk.hue_light != 'undefined'){
            switch (jchunk.hue_light){
                case 'on':
                    console.log('Light has been switched on');
                   // hue_put({on: true, sat: hue.SAT_HIGH, bri: hue.g_BRI, hue: hue.COLOR_WHITE});
                    break;
                case 'off':
                    console.log('Light has been switched off');
                   // hue_put({on: false, sat: hue.SAT_HIGH, bri: hue.g_BRI, hue: hue.COLOR_WHITE});
                    break;
            }
        }
    });

    socket.on('end', function() {
        console.info('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.error(`Error: ${err}`);
    });
});