const express = require('express')
const app = express();
const port = process.env.PORT
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

const io = new Server(httpServer,  {
    cors: {
        origin: ["https://devplacetalk.firebaseapp.com", "http://localhost:3000"]
    }});

    io.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        socket.on('disconnect', () => {
          console.log('🔥: A user disconnected');
        });
        socket.on('new-confirmed', (socket) => {
            io.emit('confirmed-notification', JSON.stringify(socket))
        });
        socket.on('new-answer', (socket) => {
            io.emit('answer-notification', JSON.stringify(socket))
        });
        socket.on('new-liked', (socket) => {
            io.emit('like-notification', JSON.stringify(socket))
        })
        socket.on('new-post', (socket) => {
            io.emit('post-notification', JSON.stringify(socket))
        })
        ;
    });

httpServer.listen(port);

