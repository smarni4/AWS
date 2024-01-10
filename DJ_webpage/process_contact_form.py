import json
import boto3

def lambda_handler(event, context):
    # Retrieve form data from the event
    name = event['Records'][0]['s3']['object']['name']
    email = event['Records'][0]['s3']['object']['email']
    message = event['Records'][0]['s3']['object']['message']

    print(name, email, message)

    # Construct email content
    subject = "New Contact from DJ Bunny Website"
    body = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"

    # Send the email using Amazon SES
    ses_client = boto3.client('ses', region_name='us-east-1')
    response = ses_client.send_email(
        Destination={
            'ToAddresses': ['srikanthmarni147@gmail.com']   # address to send the mails.
        },
        Message={
            'Body': {
                'Text': {
                    'Charset': 'UTF-8',
                    'Data': body
                }
            },
            'Subject': {
                'Charset': 'UTF-8',
                'Data': subject
            }
        },
        Source='srikanthmarni147@gmail.com'   # verified sender email
    )

    # Log the response for debugging
    print(response)

    return {
        'statusCode': 200,
        'body': json.dumps('Email sent successfully!')
    }
