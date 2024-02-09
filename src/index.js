require('dotenv').config() //Habilitamos use of enviroment variables

const Server = require('./models/Server');
const server = new Server();

server.listen();