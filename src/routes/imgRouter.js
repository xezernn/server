const express = require('express');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const createImg = require('../controllers/img.controller/createImg');
const deleteImage = require('../controllers/img.controller/deleteImg');
const router = express.Router();


//axiosInstanse.METHOD(`/img/DIRNAGIN_ICINDE_YAZILANLAR`)
// METHOD = reoter.get , reouet.post ve s yeni noqteden sonrakilar

router.post("/", auth, upload.single("img"), createImg);
router.delete("/:filename", auth, deleteImage);


module.exports = router;
