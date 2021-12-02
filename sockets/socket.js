const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    const [valido,uid]= comprobarJWT(client.handshake.headers['x-token']);
    
    //Verificar Autentificacion
    if (!valido) {return client.disconnect();}
    //Cliente autenticado
    usuarioConectado(uid);
    console.log('Cliente autenticado');
    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });
});
