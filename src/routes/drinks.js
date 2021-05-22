const express = require('express');
const drinkcontroller = require('../app/controllers/drinkcontroller');
const router = express.Router();
const multer = require('multer');
const storage = multer({dest:'public/'});

 ///[PUT]/drinks/update-drink
router.put('/update-drink/:DrinkName', drinkcontroller.updateDrink)
 ///[PUT]/drinks/update-drink
router.get('/update-drink/:DrinkName', drinkcontroller.searchDrinkName)
 ///[GET]/drinks/get-drink-type
router.get('/get-drink-type', drinkcontroller.getTypeDrink)
///[DELETE]/drinks/delete-drink
router.delete('/delete-drink', drinkcontroller.deleteDrink)
router.post('/add-drink', storage.single('Image') ,drinkcontroller.addDrink)
router.get('/', drinkcontroller.getHome)
module.exports = router;