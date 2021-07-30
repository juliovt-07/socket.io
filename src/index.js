import { Socket } from 'dgram';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(__dirname + '/public'))

io.on('connect', (socket) => {

    io.to(socket.id).emit({
        status : true,
        message: 'conexão estabelecida'
    })

    socket.on('teste', (res) => {
        console.log('message:',res);
        socket.broadcast.emit('teste', res)
    })
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/teste', (req, res) => {
    res.send({ status: false });
});


server.listen(8080, () => {
    console.log('Rodando Guri!')
})