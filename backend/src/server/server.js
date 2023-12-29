const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');


const app = express();
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

const server = http.createServer(app);
const io = new Server(server);


module.exports = { server, io}