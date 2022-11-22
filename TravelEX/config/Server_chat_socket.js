
module.exports.chatSockets = function(chatServer){
    const io = require('socket.io')(chatServer);

    io.sockets.on('connection',function(socket){
        console.log('connection is recieved',socket.id);
    })
}