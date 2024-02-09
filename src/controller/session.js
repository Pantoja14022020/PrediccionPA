const {request,response} = require('express');
const {connection} = require('../database/db');



const postSession = async (req=request, res=response) => {

    try {
        
        const {email_send,password_send} = req.body;

        //Get users of databases
        const [row,fields] = (await connection.execute('SELECT * FROM users'))
        let emailFounded = false;

        //Aqui ya obtienen todos los usuarios, ahora vamos a recorrerlos
        row.forEach((user) => {//Me obtiene el user y su id, pero solo me interesa lo que esta en el atributo user
            
            //Process to transform string rows to json readable
            const id_user = user['id'];
            const jsonString = user['user'];
            const {email,password} = JSON.parse(jsonString)

            //Asignamos variables, estas contienen las credenciales storage in database
            if((email === email_send)){//Si las credenciales estas correctas..... entonces....
                emailFounded = true;
                if(password === password_send){
                    res.status(200).json({session: true, msg: `Welcome ${email}`, email, id_user})
                }else{
                    res.status(200).json({session: false, msg: `Incorrect password`})
                }
                
            }

        });

        if(!emailFounded){
            res.status(200).json({session: false, msg: `Email not exists`})
        }

    } catch (error) {
        res.status(500).json({session: false,message: "Server error"})
    }finally{
        connection.releaseConnection();
    }

}

module.exports = {
    postSession
}