import {
    domain,
    jsonHeaders,
    handleJsonResponse
} from "./constants"

const url = domain + "/messages";
import getAllMessages from "./homepage"

export const CREATE_MESSAGE = "CREATE_MESSAGE"
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS"
export const CREATE_MESSAGE_FAIL = "CREATE_MESSAGE_FAIL"

// const str2bool = stingtoboolen=> value =>{
//     if (value && typeof value === 'string') {
//       if (value.toLowerCase() === "true") return true;
//       if (value.toLowerCase() === "false") return false;
//     }
//     return value;
//  }

const postMessage = postData => dispatch => {
    dispatch({
        type: CREATE_MESSAGE
    })
    return fetch(url + "/messages", {
            method: "POST",
            headers: jsonHeaders,
            body: JSON.stringify(postData)
        })
        .then(handleJsonResponse)
        .then(result => {
            return dispatch({
                type: CREATE_MESSAGE_SUCCESS,
                payload: result
            })
        })
        .catch(err => {
            return Promise.reject(
                dispatch({
                    type: CREATE_MESSAGE_FAIL,
                    payload: err.message
                })
            )
        })
}
export const postThenGoToHomePage = messageData => dispatch => {
    console.log(messageData)
    return dispatch(postMessage(messageData))
        .then(() => dispatch(getAllMessages()))
}