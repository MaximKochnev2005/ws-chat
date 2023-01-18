const express = require("express");
const http = require("http");
const WebSocket = require('ws');

const port = 4000;
const server = http.createServer(express);
const wss = new WebSocket.WebSocketServer({server});

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.WebSocket.OPEN){
                client.send(data.toString());
            }
        })
    })
})


server.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})