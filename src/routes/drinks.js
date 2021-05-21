const express = require('express');
const drinkcontroller = require('../app/controllers/drinkcontroller');
const router = express.Router();
const multer = require('multer');
const storage = multer({dest:'public/'});

 ///[PUT]/drinks/update-drink
router.put('/update-drink/:DrinkName', drinkcontroller.updateDrink)
router.post('/add-drink', storage.single('Image') ,drinkcontroller.addDrink)
router.get('/', drinkcontroller.getHome)
module.exports = router;