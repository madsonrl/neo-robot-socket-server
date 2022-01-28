const { createServer } = require('http');
const WebSocket = require('ws');
const server = createServer();

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log("Client connected")
    ws.on('message', (data) => {

        const message = data.toString();

        console.log("Message: ", message)
        
        

        wss.clients.forEach((clients) => {
            clients.send(message);
        })

    });
})


server.on('upgrade', function upgrade(request, socket, head) {

    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });

});




server.listen(9500, () => {
    console.log("Server Started")
});