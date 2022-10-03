const router = require('express').Router();
const authControllers = require('../controllers/auth.controllers');
const passport = require('passport');

router.get('/login', authControllers.getLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), authControllers.postLogin);
router.get('/faillogin', authControllers.getFaillogin);
router.get('/signup', authControllers.getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), authControllers.postSignup);
router.get('/failsignup', authControllers.getFailsignup);
router.get('/logout', authControllers.getLogout);

module.exports = router;
