const express =  require('express');
const cors = require('cors');
const {connection} = require('../database/db');

class Server{
    constructor(){
        this.app = express();
        this.port = 3000 || process.env.PORT;
        
        //Define string for routes
        this.userPath = '/user';
        this.sessionPath = '/session';
        
        //We call functions
        this.dbConnect()
        this.middleware()
        this.route()   
    }

    middleware(){//Allow cors to exchange information between different systems, at the same time, i use json 'cause i will be able to drive responsees in this format
        this.app.use(cors())
        this.app.use(express.json())
    }

    route(){
        this.app.use(this.userPath,require('../routes/user'))//Aqui le asigno la ruta a la url creada
        this.app.use(this.sessionPath, require('../routes/session'));
    }

    async dbConnect(){//Asyncrone function to connect to database, in this case, PlanetScale
        connection ? console.log("Database connected!") : console.log("Database not connected!")
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server Up On the Port ${this.port}`)
        })
    }
}


module.exports = Server;