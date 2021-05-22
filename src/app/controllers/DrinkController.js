const { response } = require("express");
const AWS = require("aws-sdk");
const { connectAWS } = require("../../config/aws");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: 'hoaithu08101',
    api_key: '383836636315665',
    api_secret: '8zvuyYem8SN-pyts-6gaqgzmUrI'
  });
const storage = multer({dest:'public/'});
class DrinkController {
  async getHome(req, res) {
        let docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
        TableName: "Drinks",
        };
        var result = await docClient.scan(params).promise();
        var data = result.Items
        res.send(data);
    }
    async addDrink (req, res){
        const DrinkName = req.body.DrinkName;
        const Description = req.body.Description;
        const imageUrl =  await cloudinary.uploader.upload(req.file.path, {folder: 'Drinks'});
        //const Image = req.body.Image;
        const DrinkType = req.body.DrinkType;
        const Price = req.body.Price;

        var docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: "Drinks" ,
            Item:{
                "DrinkName": DrinkName,
                "Description": Description,
                "Image":  imageUrl.secure_url,
                "DrinkType": DrinkType,
                "Price": Price,
            }
        };
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                var result  = JSON.stringify(data, null, 2);
                res.status(200).send({message: "Thêm món ăn thành công"})
            }
        });
    }
    ///[PUT]/drinks/update-drink
    async updateDrink (req, res, next){
        const DrinkName = req.params.DrinkName;
        const Description = req.body.Description;
        //const Image = req.body.Image;
        const DrinkType = req.body.DrinkType;
        const Price = req.body.Price;
        const imageUrl =  await cloudinary.uploader.upload(req.file.path, {folder: 'Drinks'});
        
        var docClient = new AWS.DynamoDB.DocumentClient()
        var params = {
            TableName: "Drinks" ,
            Key:{
                "DrinkName": DrinkName
            },
            UpdateExpression: "set Description = :a, Image = :b, DrinkType = :c, Price = :d ",
            ExpressionAttributeValues:{
                ":a": Description,
                ":b" : imageUrl.secure_url,
                ":c" : DrinkType,
                ":d" : Price,
            },
            ReturnValues:"UPDATED_NEW"
        };
        docClient.update(params, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                var result = JSON.stringify(data, null, 2)
                res.status(200).send({message: "update thành công" , data : result})
            }
        });
    }
    ///[DELETE]/drinks/delete-drink
    deleteDrink (req, res, next){
        const DrinkName = req.query.DrinkName;
        var docClient = new AWS.DynamoDB.DocumentClient()
        var paramsDelete = {
            TableName: "Drinks" ,
            Key:{
                "DrinkName": DrinkName
            },
            ConditionExpression:" DrinkName = :n",
            ExpressionAttributeValues: {
                ":n": DrinkName
            }
        };
        var paramsQuery = {
            TableName: "Drinks" ,
            Key:{
                "DrinkName": DrinkName
            },
            KeyConditionExpression: "#DN = :DN",
            ExpressionAttributeNames:{
                "#DN": "DrinkName"
            },
            ExpressionAttributeValues: {
                ":DN": DrinkName
            }
        };
        docClient.query(paramsQuery, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
            } else {
                var result = data.Items
                var paramsAdd = {
                    TableName: "Drinks_BackUp" ,
                    Item:{
                        "DrinkName": data.Items[0].DrinkName,
                        "Description": data.Items[0].Description,
                        "Image":  data.Items[0].Image,
                        "DrinkType": data.Items[0].DrinkType,
                        "Price": data.Items[0].Price,
                    }
                };
                docClient.put(paramsAdd, function(err, data) {
                    if (err) {
                        res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
                    } else {
                        docClient.delete(paramsDelete, function(err, data) {
                            if (err) {
                                res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
                            } else {
                                res.status(200).send({message : "Xóa món ăn thành công"})
                            }
                        });
                    }
                });
            }
        });
    }
    ///[GET]/drinks/get-drink-type
    async getTypeDrink (req, res, next){
        let docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
        TableName: "DrinkType",
        };
        var result = await docClient.scan(params).promise();
        var data = result.Items
        res.send(data);
    }
    ///[GET]/drinks/search-drink-name
    searchDrinkName (req, res, next){
        const DrinkName = req.params.DrinkName;

        var docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName : "Drinks",
            KeyConditionExpression: "#DN = :DN",
            ExpressionAttributeNames:{
                "#DN": "DrinkName"
            },
            ExpressionAttributeValues: {
                ":DN": DrinkName
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
            } else {
                var result = data.Items
                return res.status(200).send(data.Items)
            }
        });
    }
    ///[DELETE]/drinks/restore-drink
    restoreDrink (req, res, next){
        const DrinkName = req.query.DrinkName;
        var docClient = new AWS.DynamoDB.DocumentClient()
        var paramsDelete = {
            TableName: "Drinks_BackUp" ,
            Key:{
                "DrinkName": DrinkName
            },
            ConditionExpression:" DrinkName = :n",
            ExpressionAttributeValues: {
                ":n": DrinkName
            }
        };
        var paramsQuery = {
            TableName: "Drinks_BackUp" ,
            Key:{
                "DrinkName": DrinkName
            },
            KeyConditionExpression: "#DN = :DN",
            ExpressionAttributeNames:{
                "#DN": "DrinkName"
            },
            ExpressionAttributeValues: {
                ":DN": DrinkName
            }
        };
        docClient.query(paramsQuery, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
            } else {
                var result = data.Items
                var paramsAdd = {
                    TableName: "Drinks" ,
                    Item:{
                        "DrinkName": data.Items[0].DrinkName,
                        "Description": data.Items[0].Description,
                        "Image":  data.Items[0].Image,
                        "DrinkType": data.Items[0].DrinkType,
                        "Price": data.Items[0].Price,
                    }
                };
                docClient.put(paramsAdd, function(err, data) {
                    if (err) {
                        res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
                    } else {
                        docClient.delete(paramsDelete, function(err, data) {
                            if (err) {
                                res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
                            } else {
                                res.status(200).send({message : "Phục hồi món ăn thành công"})
                            }
                        });
                    }
                });
            }
        });
    }
    ///[DELETE]/drinks/delete-hard-drink
    deleteHardDrink (req, res, next){
        const DrinkName = req.query.DrinkName;
        var docClient = new AWS.DynamoDB.DocumentClient()
        var paramsDelete = {
            TableName: "Drinks_BackUp" ,
            Key:{
                "DrinkName": DrinkName
            },
            ConditionExpression:" DrinkName = :n",
            ExpressionAttributeValues: {
                ":n": DrinkName
            }
        };
        docClient.delete(paramsDelete, function(err, data) {
            if (err) {
                res.status(400).send({message : "Unable to query. Error:" +  JSON.stringify(err, null, 2)})
            } else {
                res.status(200).send({message : "Xóa món ăn vĩnh viễn"})
            }
        });
    }
    ///[GET]/drinks/restore-drink
    async getDrinkRestore(req, res) {
        let docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
        TableName: "Drinks_BackUp",
        };
        var result = await docClient.scan(params).promise();
        var data = result.Items
        res.send(data);
    }
}
module.exports = new DrinkController();
