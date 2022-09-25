import wixData from 'wix-data';
import { greetNewStudent } from 'backend/twilio.jsw';

export function addNewQuestionButton_click(event) {
	wixData.query("QuestionList")
		.count()
		.then((num) => {
			console.log(num);
			let numberOfItems = num+1;
			let question = $w('#newQues').value;
			let dataToStore = {
				"question": question,
				"id": `${numberOfItems}`
			}

			wixData.insert("QuestionList", dataToStore)
			.then((item) => {
				console.log(item); //see item below
				$w('#newQues').value = "";
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

export function registerStu_click(event) {
	wixData.query("StudentList")
	.count()
	.then((num) => {
		let numberOfItems = num+1;
		let name = $w('#stName').value;
		let phoneNum = $w('#stNumber').value;
		let countryCode='+94'
		let dataToStore = {
			"name": name,
			"phoneNumber": `whatsapp:${countryCode}${phoneNum.slice(1)}`,
			"id": `${numberOfItems}`
		}

		wixData.insert("StudentList", dataToStore)
		.then((item) => {
			console.log(item); //see item below
			$w('#stNumber , #stName').value = "";
		})
		.catch((err) => {
			console.log(err);
		});
		greetNewStudent(`whatsapp:${countryCode}${phoneNum.slice(1)}`);
	})
	.catch((error) => {
		let errorMsg = error.message;
		let code = error.code;
		console.log(`${errorMsg}, ${code}`);
	});
	
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*	 @param {$w.MouseEvent} event

export function feebackButton_click(event) {
	wixData.query("FeedbackList")
		.count()
		.then((num) => {
			console.log($w('#refQuestion').html);
			let numberOfItems = num+1;
			let question = $w('#refQuestion').html;
			let answer = $w('#refAnswer').text;
			let name = $w('#refStuNum').text;
			let number = $w('#refStuName').text;
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
				$w('#feedbackInput').value = "";
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

*/
