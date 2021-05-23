const AWS = require('aws-sdk');
const aws = require('./config/aws')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors');
const docClient = new AWS.DynamoDB.DocumentClient();
require('dotenv').config();
aws.connectAWS();
app.set();
/*const corsOptions ={
    origin: '*, https://coffee-aws.web.app', 
    credentials: true,         
    optionSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Origin', 
        'x-access-token', 
        'XSRF-TOKEN'
    ], 
    preflightContinue: false 
}*/
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*, https://coffee-aws.web.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
route(app);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
