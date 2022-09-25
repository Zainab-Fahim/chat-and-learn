// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';
import { sendFeedback } from 'backend/twilio.jsw';
let idToDelete;

export function feedbackButton_click(event) {
    wixData.query("FeedbackList")
        .count()
        .then((num) => {
            console.log($w('#refQuestion').text);
            let numberOfItems = num + 1;
            let question = $w('#refQuestion').text;
            let answer = $w('#refAnswer').text;
            let name = $w('#refStuName').text;
            let number = $w('#refStuNum').text;
            let feedback = $w('#feedbackInput').value;
            let dataToStore = {
                "question": question,
                "feedback": feedback,
                "number": number,
                "name": name,
                "answer": answer,
                "id": `${numberOfItems}`
            }

            wixData.insert("FeedbackList", dataToStore)
                .then((item) => {
                    console.log(item); //see item below
                    console.log(`NAME is ${name} \n NUMBER is ${number}\n QUESTION is: ${question}\n ANSWER is: ${answer}\n FEEDBACK is: ${feedback}`);
                    sendFeedback(name, number, question, answer, feedback);
                    $w('#feedbackInput').value = "";
                })
                .catch((err) => {
                    console.log(err);
                });

            wixData.query("AnswerList")
                .eq("id", `${$w('#answerID').text}`)
                .find()
                .then((results) => {
                    if (results.items.length > 0) {
                        console.log("ANSWERLIST CORRESS ITEM IS: ",results.items[0]); //see firstItem below
                        idToDelete = results.items[0]._id;
						console.log("ANSWERLIST CORRESS ID IS: ",idToDelete);
						 wixData.remove("AnswerList", `${idToDelete}`)
							.then((results) => {
								console.log("REMOVED ITEM IS", results); //see item below
							})
							.catch((err) => {
								console.log(err);
							});
                    } else {
                        // handle case where no matching items found
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((error) => {
            let errorMsg = error.message;
            let code = error.code;
            console.log(`${errorMsg}, ${code}`);
        });

}
