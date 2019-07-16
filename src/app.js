const express  = require('express');
const path     = require('path');
const http     = require('http');
const socketio = require('socket.io');
const router   = require('./routers/user');

const app    = express();
const server = http.createServer(app);
const io     = socketio(server);

const publicDir = path.join(__dirname, '../public');
const port      = process.env.PORT;

let users = {};

app.use(express.json());
app.use(express.static(publicDir));
app.use(router);

io.on('connection', (socket) => {
    socket.on('userConnected', (login) => users[login] = socket);

    socket.on('message', ({ to, from, message } = {}) => {
        let user = users[to];
        if (!user) {
            return socket.emit('message', {
                from,
                message: `No user named ${to}`
            });
        }

        user.emit('message', {
            from,
            message
        });
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});