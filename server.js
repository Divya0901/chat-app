const path = require('path');
const http = require('http');
const express = require('express');
const sockerio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = sockerio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connected
io.on('connection', socket => {
    console.log('New WS connection......');

    socket.emit('message', 'Welcome to ChatApp!');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // all users connects
    // io.emit();
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));