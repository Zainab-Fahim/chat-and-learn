const axios = require('axios');
exports.handler = async(context, event, callback) => {
  let receipent_contact=event.receipent_contact;
  console.log(`RECEIPIENT CONTACT IS: ${receipent_contact}`);
  console.log(`${context.http_function_site}`);

  //update the status
  try {
    //get wix database
    let questionList = await axios.get(`${context.http_function_site}/questionlist`);
    console.log("QUESTION LIST IS : ",questionList.data.items.length);
    callback(null,questionList.data);
  } catch (error) {
    console.error(error);
    callback(null,error);
  }

};
