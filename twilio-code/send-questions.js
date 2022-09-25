const axios = require('axios');
exports.handler = async(context, event, callback) => {
  let receipent_contact=event.receipent_contact;
  let response='';
  console.log(`${context.http_function_site}`);

  //update the status
  try {
    //get wix database
    let questionList = await axios.get(`${context.http_function_site}/questionlist`);
    sendQuestion=questionList.data.items[event.ques_num].question
    response+=`${sendQuestion}`;

  } catch (error) {
    console.error(error);
  }


  //send the updated status
  const twilioClient = context.getTwilioClient();
  const from = event.From || `${context.to_phoneNum}`; //whatsApp sandbox phone number
  const to = event.To || `${receipent_contact}`;
  const body = event.Body || `${response}`;
  twilioClient.messages
    .create({ body, to, from })
    .then((message) => {
      console.log('SMS successfully sent');
      console.log(message.sid);
      return callback(null, `${response}`);
    })
    .catch((error) => {
      console.error(error);
      return callback(error);
    });

};
