const { register, login, authByGoogle } = require('../controllers/user.controller');
const { showGoogleAuthPage, redirectUserAfterAuth } = require('../middlewares/googleAuth.middleware');

const router = require('express').Router();


router.post('/register', register);
router.post('/login', login);

// open google auth page
router.get('/google', showGoogleAuthPage);

// redirect user after authentication
router.get('/google/redirect', redirectUserAfterAuth, authByGoogle);


module.exports = router;