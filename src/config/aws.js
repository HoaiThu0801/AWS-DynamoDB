const AWS = require('aws-sdk');
function connectAWS (){
  try {
    var awsConfig = {
        "region": "us-east-2",
        "accessKeyId":"AKIA2PQ3HORYXO3LJ6WO",
        "secretAccessKey": "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"
    }
    AWS.config.update(awsConfig);

    console.log('Success Aws');
  } 
  catch (error) {
    console.log('fail');
  }
}
module.exports = {
  connectAWS
};