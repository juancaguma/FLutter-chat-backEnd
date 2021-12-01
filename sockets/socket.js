const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    const [valido,uid]= comprobarJWT(client.handshake.headers['x-token']);
    
    if (!valido) {return client.disconnect();}
    console.log('Cliente autenticado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
