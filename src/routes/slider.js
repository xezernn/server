const express = require('express');
const router = express.Router();

const { createSlider, getSliders, deleteSliderById } = require('../controllers/slider.controllers');

const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');


//axiosInstanse.METHOD(`/slider/DIRNAGIN_ICINDE_YAZILANLAR`)
// METHOD = reoter.get , reouet.post ve s yeni noqteden sonrakilar

router.post('/', auth, upload.single('img'), createSlider);
router.get('/', getSliders);
router.delete('/:id', deleteSliderById);

module.exports = router;
