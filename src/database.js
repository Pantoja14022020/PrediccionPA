const mysql = require('mysql2/promise');//Importar la libreria instalada, 'promise' es el uso de consultas con promesas
const connection = mysql.createPool(process.env.DATABASE_URL_PLANETSCALE);//Conectarse a DB
module.exports = {
    connection
}; //Exportar la conexion para que sea usada en otros archivos