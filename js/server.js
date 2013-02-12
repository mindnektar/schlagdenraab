var io = require('socket.io').listen(8080),
    cons = {},
    config;

if (process.argv[2]) {
    config = require('../games/' + process.argv[2] + '/js/server.config.js');
}

io.sockets.on('connection', function (socket) {
    socket.on('reg', function(who) {
        if (cons[who]) {
            socket.disconnect();
            return;
        }

        socket.who = who;
        cons[who] = socket;

        if (config.startCondition && config.startCondition(cons)) {
            socket.broadcast.emit('msg', {type: 'connected'});
        }
    });

    socket.on('msg', function(data) {
        socket.broadcast.emit('msg', data);
    });

    socket.on('disconnect', function() {
        delete cons[socket.who];
    });
});
