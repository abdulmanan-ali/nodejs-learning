const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(express.static(path.resolve("./public")));

// socket.io
io.on("connection", (socket) => {
    socket.on('user-message', (message) => {
        io.emit('message', message)
    })
});

app.get('/', (req, res) => {
    return res.sendFile('/public/index.html')
})

httpServer.listen(3000, () => {
    console.log("server started on port 3000")
}); 

// write a function to sum of two numbers in js
