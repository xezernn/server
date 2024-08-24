const express = require('express');
const router = express.Router();

const { register, login, verifyToken, refreshToken } = require('../controllers/auth.controllers');
const auth = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validation.middleware');

const authSchema = require('../schema/auth.schema');

//axiosInstanse.METHOD(`/auth/DIRNAGIN_ICINDE_YAZILANLAR`)
// METHOD = reoter.get , reouet.post ve s yeni noqteden sonrakilar

router.post('/register', auth, validator(authSchema), register);
router.post('/login', validator(authSchema), login);
router.post('/refresh-token', refreshToken);
router.get('/verify-token', auth, verifyToken);

module.exports = router;
