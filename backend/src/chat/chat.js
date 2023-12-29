const {io} = require('../server/server');

const UsersInRoom = [];
const msgInRoom = [];


io.on('connection', (socket) => {
    socket.on('chat msg', (obj) => {
        socket.join(obj.tlp);
        
        let nacio = obj.nacio;
        if(!obj.nacio) nacio = 'angolana';
        
        let user = {
            id: socket.id,
            name: obj.fullname,
            turma: obj.tlp,
            email: obj.email,
            nacionality: nacio, 
        };

        const exist = UsersInRoom.find(el => el.email == user.email && el.turma == user.turma );

        if(exist){
            exist.id = user.id;
        }else {
            UsersInRoom.push(user);
            let resp = `Olá ${obj.fullname} de nacionalidade ${nacio}, esperamos que estejas bem de saude!. Então sobre ${obj.tlp} o que gostaria de saber? `
            socket.emit("chat msg",  resp)
        }        
    });

    socket.on('msg', (msg) => {
        io.to(msg.tlp).emit('msg', `name: ${msg.fullname} |
        message: ${msg.msg} |
        ${new Date().toLocaleDateString('pt-Pt')}`)
    })
})

