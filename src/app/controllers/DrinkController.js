const { response } = require("express");
const AWS = require("aws-sdk");
const { connectAWS } = require("../../config/aws");

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
}
module.exports = new DrinkController();
