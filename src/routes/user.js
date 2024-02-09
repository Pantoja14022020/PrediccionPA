const {Router} = require('express'); //Import enruter to define all endpoint 
const router = Router(); //We instance object router
const {getUser,postUser,putUser} = require('../controller/user');

router.get('/',getUser);
router.post('/',postUser);
router.put('/:id',putUser);

module.exports = router;