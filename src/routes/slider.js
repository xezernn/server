const express = require('express');
const router = express.Router();

const { createSlider, getSliders, deleteSliderById } = require('../controllers/slider.controllers');

const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/', auth, upload.array('img', 5), createSlider);
router.get('/', getSliders);
router.delete('/:id', deleteSliderById);

module.exports = router;
