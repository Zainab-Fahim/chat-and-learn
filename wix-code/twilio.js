import twilio from 'twilio';
import wixSecretsBackend from 'wix-secrets-backend';

export async function greetNewStudent(toPhoneNum) {
    const twilioAuthToken = await wixSecretsBackend.getSecret('twilioAuthToken');
    const twilioAccountSid = await wixSecretsBackend.getSecret('twilioAccountSid');
    const twilioPhoneNumber = await wixSecretsBackend.getSecret('twilioPhoneNumber');

    const twilioClient = new twilio(twilioAccountSid, twilioAuthToken)
        twilioClient.messages.create({
        "body": `hey! welcome to chat-and-learn!`,
        "from": `whatsapp:${twilioPhoneNumber}`,
        "to": `${toPhoneNum}`
    })
}

export async function sendFeedback(name, toPhoneNum, question, answer, feedback) {
    console.log("IN TWILIO FUNCTION");
    console.log(`Hey ${name},\n\nThank You for answering the question *${question}*\n\n Here is the copy of your answer:\n_${answer}_\n\nHere is the feedback for your an:\n${feedback}`);
    let respose=`Hey ${name},\n\nThank You for answering the question *${question}*\n\n Here is the feedback for your _${answer}_:\n${feedback}`;
    const twilioAuthToken = await wixSecretsBackend.getSecret('twilioAuthToken');
    const twilioAccountSid = await wixSecretsBackend.getSecret('twilioAccountSid');
    const twilioPhoneNumber = await wixSecretsBackend.getSecret('twilioPhoneNumber');

    const twilioClient = new twilio(twilioAccountSid, twilioAuthToken)
        twilioClient.messages.create({
        "body": `${respose}`,
        "from": `whatsapp:${twilioPhoneNumber}`,
        "to": `${toPhoneNum}`
    })
}
