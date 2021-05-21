const { response } = require("express");

class DrinkController {
    getHome (req, res){
        res.send("Hello");
    }
}
module.exports = new DrinkController();