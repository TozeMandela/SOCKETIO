const {server} = require('./server/server');
require('./chat/chat');

server.listen(3003, () => {
    console.log('server rodando');
})