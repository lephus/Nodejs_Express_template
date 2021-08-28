const express = require('express')
const router = express.Router()
const getSliders = require('../controllers/slider')

router.route('/get-slides').get(getSliders)

module.exports = router
