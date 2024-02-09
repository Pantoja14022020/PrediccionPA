const mysql = require('mysql2/promise');
const connection = mysql.createPool(process.env.DATABASE_URL);
////AQUI ME QUEDE, UTILICE una version de MSYQL incorrecta, pero ya instale el mysql2, falta cambiar las consultas al formato de mysl2

module.exports = {connection};