const express = require('express');
const drinkcontroller = require('../app/controllers/drinkcontroller');
const router = express.Router();
const multer = require('multer');
const storage = multer({dest:'public/'});

 ///[PUT]/drinks/update-drink
router.put('/update-drink/:DrinkName', drinkcontroller.updateDrink)
 ///[GET]/drinks/get-drink-type
router.get('/get-drink-type', drinkcontroller.getTypeDrink)
///[GET]/drinks/search-drink-name
router.get('/search-drink-name', drinkcontroller.searchDrinkName)
router.post('/add-drink', storage.single('Image') ,drinkcontroller.addDrink)
router.get('/', drinkcontroller.getHome)
module.exports = router;