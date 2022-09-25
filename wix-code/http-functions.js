import { ok, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

export function get_questionlist() {
  //https://fahim20210482.wixsite.com/chat-and-learn/_functions/questionlist
    const options = {
        "headers": {
            'Content-Type': 'application/json'
        }
    };

    return wixData.query("QuestionList")
        .find()
        .then(results => {
            if (results.items.length > 0) {
                options.body = {
                    "items": results.items
                }
                return ok(options)
            }
        })

}

export function get_studentlist() {
  //https://fahim20210482.wixsite.com/chat-and-learn/_functions/studentlist
    const options = {
        "headers": {
            'Content-Type': 'application/json'
        }
    };

    return wixData.query("StudentList")
        .find()
        .then(results => {
            if (results.items.length > 0) {
                options.body = {
                    "items": results.items
                }
                return ok(options)
            }
        })

}
export function get_answerlist() {
  //https://fahim20210482.wixsite.com/chat-and-learn/_functions/answerlist
    const options = {
        "headers": {
            'Content-Type': 'application/json'
        }
    };

    return wixData.query("StudentList")
        .find()
        .then(results => {
            if (results.items.length > 0) {
                options.body = {
                    "items": results.items
                }
                return ok(options)
            }
        })

}

export function put_answerlist(request) {
  let options = {
    "headers": {
      "Content-Type": "application/json",
      "suppressAuth": true, // Setting this option to true will bypass the permissions.
        "suppressHooks": true // Setting this option to true will bypass the hooks.
    }
  };
  // get the request body
  return request.body.json()
  .then( (body) => {
      // update the item in a collection
      return wixData.update("AnswerList", body);
    } )
    .then( (results) => {
      options.body = {
        "inserted": results
      };
      return ok(options);
    } )
    // something went wrong
    .catch( (error) => {
      options.body = {
        "error": error
      };
      return serverError(options);
    } );
}

