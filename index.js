const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/message-database'
const port = process.env.PORT || 50;

const Msg = require('./chatSchema')
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

mongoose.connect(mongoDB).then(() => {
    console.log('connected' )
}).catch(err => console.log(err));

io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', msg => {
        const message = new Msg({message:msg}) 
        message.save().then(() => {
            io.emit('chat message', msg);
        })
        
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http:/localhost:${port}/`);
});