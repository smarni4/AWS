//import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
//
//const RECEIVER = 'srikanthmarni147@gmail.com';
//const SENDER = 'srimarni147@gmail.com';
//
//const response = {
//  isBase64Encoded: false,
//  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
//  statusCode: 200,
//  body: '{"result": "Success."}'
//};
//
//export const handler = async (event) => {
//  try {
//    console.log('Received event:', event);
//    await sendEmail(event);
//    return response;
//  } catch (error) {
//    console.error(error);
//    return {
//      statusCode: 500,
//      body: JSON.stringify({ error: error.message }),
//    };
//  }
//};
//
//async function sendEmail(event) {
//  const sesClient = new SESClient();
//  const params = {
//    Destination: { ToAddresses: [RECEIVER] },
//    Message: {
//      Body: {
//        Text: {
//          Data: `name: ${event.name}\nphone: ${event.phone}\nemail: ${event.email}\ndesc: ${event.desc}`,
//          Charset: 'UTF-8',
//        },
//      },
//      Subject: { Data: `Website Referral Form: ${event.name}`, Charset: 'UTF-8' },
//    },
//    Source: SENDER,
//  };
//  await sesClient.send(new SendEmailCommand(params));
//
//}

var AWS = require('aws-sdk');
var ses = new AWS.SES();

var RECEIVER = 'srikanthmarni147@gmail.com';
var SENDER = 'srimarni147@gmail.com';

var response = {
 "isBase64Encoded": false,
 "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
 "statusCode": 200,
 "body": "{\"result\": \"Success.\"}"
 };

exports.handler = function (event, context) {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
return response;
};

function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'name: ' + event.name + '\nphone: ' + event.phone + '\nemail: ' + event.email + '\ndesc: ' + event.desc,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params).promise();
}
