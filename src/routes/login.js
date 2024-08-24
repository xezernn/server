const express = require('express');
const router = express.Router();

const { register, login, verifyToken } = require('../controllers/auth.controllers');
const auth = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validation.middleware');

const authSchema = require('../schema/auth.schema');

//axiosInstanse.METHOD(`/auth/DIRNAGIN_ICINDE_YAZILANLAR`)
// METHOD = reoter.get , reouet.post ve s yeni noqteden sonrakilar

router.post('/register', validator(authSchema), register);
router.post('/login', validator(authSchema), login);
router.get('/verify-token', auth, verifyToken);

module.exports = router;
