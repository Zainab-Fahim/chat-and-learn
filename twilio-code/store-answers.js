const axios = require('axios');
exports.handler = async(context, event, callback) => {
  let receipent_contact=event.receipent_contact;
  console.log(`receipent_contact IS : ${receipent_contact}`);
  let receipent_name=event.receipent_name || 'gj';
  console.log(`receipent_name IS : ${receipent_name}`);
  let receipent_answer=event.receipent_answer || 'gj';
  console.log(`receipent_answer IS : ${receipent_answer}`);
  let receipent_question=event.receipent_question || 'gj';
  console.log(`receipent_question IS : ${receipent_question}`);
  let response='';
  console.log(`${context.http_function_site}`);
  
  //update the status
  try {
    //get wix database
    let answerList = await axios.get(`${context.http_function_site}/answerlist`);
    let receipent_id=answerList.data.items.length+1
    console.log(`receipent_id IS : ${receipent_id}`);
    answerList=answerList.data.items
      let toUpdate= {
        "number":`${receipent_contact}`, 
        "name":`${receipent_name}`, 
        "question":`${receipent_question}`, 
        "id":`${receipent_id}`, 
        "answer":`${receipent_answer}`, 
      };
      const updateAnswer = await axios.put(`${context.http_function_site}/answerlist/${receipent_id}`,toUpdate)
      response=`Your answer to the question:\n\n*${receipent_question}*\n\nis recorded as:\n\n_${receipent_answer}_`;
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
      return callback(null, `Success! Message SID: ${message.sid}`);
    })
    .catch((error) => {
      console.error(error);
      return callback(error);
    });
};
