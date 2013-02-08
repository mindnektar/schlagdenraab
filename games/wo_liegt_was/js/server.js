var io = require('socket.io').listen(8080),
    cons = {};

io.sockets.on('connection', function (socket) {
    socket.on('reg', function(who) {
        if (cons[who]) {
            socket.disconnect();
            return;
        }

        socket.who = who;
        cons[who] = socket;

        if (cons.moderator && cons.audience && cons.blue && cons.red) {
            cons.moderator.emit('msg', {type: 'connected'})
        }
    });

    socket.on('msg', function(data) {
        socket.broadcast.emit('msg', data);
    });

    socket.on('disconnect', function() {
        delete cons[socket.who];
    });
});
