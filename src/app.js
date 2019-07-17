const express  = require('express');
const path     = require('path');
const http     = require('http');
const socketio = require('socket.io');
const router   = require('./routers/user');
const msg      = require('./utils/store-messages');
const Message  = require('./models/message');

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
    // Save socket to an object for proper messaging
    socket.on('userConnected', (login) => users[login] = socket);

    socket.on('message', async ({ to, from, message } = {}, callback) => {
        let user = users[to];
        if (!user) {
            return socket.emit('message', {
                from,
                message: `No user named ${to}`
            });
        }

        let conversation = await msg.getConversation([to, from]);

        let messageObj = new Message({
            sender: from,
            content: message,
            time: Date.now(),
            conversationId: conversation._id
        });
        messageObj.save();

        user.emit('message', {
            from,
            message,
        });
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});