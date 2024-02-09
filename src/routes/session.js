const {Router} = require('express'); //Import enruter to define all endpoint 
const router = Router(); //We instance object router
const {postSession} = require('../controller/session');

//Recibe las credenciales desde el front end en reactjs
router.post('/',postSession);

module.exports = router;