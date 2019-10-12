import {
    domain,
    // jsonHeaders,
    handleJsonResponse
} from "./constants";
//import { push } from "connected-react-router";

const url = domain + "/messages";

export const GET_MESSAGES = "GET_MESSAGES"
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS"
export const GET_MESSAGES_FAIL = "GET_MESSAGES_FAIL"


export const getAllMessages = (

) => dispatch => {
    dispatch({
        type: GET_MESSAGES
    });
    // this url is going to be ---> https://kwitter-api.herokuapp.com/messages?limit=100&offset=0
    return fetch(url)
        .then(handleJsonResponse)
        .then(result => {
            dispatch({
                type: GET_MESSAGES_SUCCESS,
                payload: result
            });
        })
        .catch(err => {
            dispatch({
                type: GET_MESSAGES_FAIL,
                payload: err
            });
        });
};

export const UPVOTE = "UPVOTE"
export const UPVOTE_SUCCESS = "UPVOTE_SUCCESS"
export const UPVOTE_FAIL = "UPVOTE_FAIL"

// const str2bool = stingtoboolen=> value =>{
//     if (value && typeof value === 'string') {
//       if (value.toLowerCase() === "true") return true;
//       if (value.toLowerCase() === "false") return false;
//     }
//     return value;
//  }

const handelUpvote = messageId => dispatch => {
    dispatch({
        type: UPVOTE
    })
    return fetch(url + `/upvote/${messageId}`, {
            method: "POST",
            // headers: jsonHeaders,
            // body: JSON.stringify(postData)
        })
        .then(handleJsonResponse)
        .then(result => {
            return dispatch({
                type: UPVOTE_SUCCESS,
                payload: result
            })
        })
        .catch(err => {
            return Promise.reject(
                dispatch({
                    type: UPVOTE_FAIL,
                    payload: err.message
                })
            )
        })
}
export const upvoteThenGoToHomePage = messageId => dispatch => {
    console.log(messageId)
    return dispatch(handelUpvote(messageId))
        .then(() => dispatch(getAllMessages()))
}

export const DOWNVOTE = "DOWNVOTE"
export const DOWNVOTE_SUCCESS = "DOWNVOTE_SUCCESS"
export const DOWNVOTE_FAIL = "DOWNVOTE_FAIL"

const handelDownvote = messageId => dispatch => {
    dispatch({
        type: DOWNVOTE
    })
    return fetch(url + `/downvote/${messageId}`, {
            method: "POST",
            // headers: jsonHeaders,
            // body: JSON.stringify(postData)
        })
        .then(handleJsonResponse)
        .then(result => {
            return dispatch({
                type: DOWNVOTE_SUCCESS,
                payload: result
            })
        })
        .catch(err => {
            return Promise.reject(
                dispatch({
                    type: DOWNVOTE_FAIL,
                    payload: err.message
                })
            )
        })
}
export const downvoteThenGoToHomePage = messageId => dispatch => {
    console.log(messageId)
    return dispatch(handelDownvote(messageId))
        .then(() => dispatch(getAllMessages()))
}