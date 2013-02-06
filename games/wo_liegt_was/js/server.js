var WebSocketServer = require('./node_modules/ws').Server,
    wss = new WebSocketServer({host: '127.0.0.1', port: 8080}),
    cons = [];
 
wss.on('connection', function(ws) {

    cons.push(ws);

    ws.on('message', function(msg) {
        var toSend = JSON.parse(msg);

        if (!toSend.data) {
            toSend.data = {};
        }
        
        toSend.data.player = ws.upgradeReq.url.substring(1);
        toSend = JSON.stringify(toSend);

        for (var i = 0; i < cons.length; i++) {
            cons[i].send(toSend);
        }
    });
});