const express = require('express');
const drinkcontroller = require('../app/controllers/drinkcontroller');
const router = express.Router();

router.get('/', drinkcontroller.getHome)
module.exports = router;