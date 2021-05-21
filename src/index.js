const AWS = require('aws-sdk');
const aws = require('./config/aws')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes')
const docClient = new AWS.DynamoDB.DocumentClient();

aws.connectAWS();
app.set();
route(app);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
