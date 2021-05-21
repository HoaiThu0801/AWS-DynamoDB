const AWS = require('aws-sdk');
const aws = require('./config/aws')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes')
const bodyParser = require('body-parser')
const docClient = new AWS.DynamoDB.DocumentClient();
require('dotenv').config();
aws.connectAWS();
app.set();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
route(app);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
