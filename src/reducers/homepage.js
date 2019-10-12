import {
    GET_MESSAGES,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    UPVOTE,
    DOWNVOTE,
    UPVOTE_SUCCESS,
    UPVOTE_FAIL,
    DOWNVOTE_SUCCESS,
    DOWNVOTE_FAIL
} from "../actions";
const initialState = {
    getMessagesLoading: false,
    messages: [],
    getMessagesError: null,


};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return {
                ...state,
                getMessagesLoading: true,
            };
        case GET_MESSAGES_SUCCESS:
            return {
                ...state, messages: action.payload.messages, getMessagesLoading: false
            };
        case GET_MESSAGES_FAIL:
            return {
                ...state, getMessagesError: action.payload, getMessagesLoading: false
            };
        case UPVOTE:
            return {
                ...state,

            };
        case UPVOTE_SUCCESS:
            return {
                ...state
            };
        case UPVOTE_FAIL:
            return {
                ...state, getUpvoteError: action.payload
            };
        case DOWNVOTE:
            return {
                ...state,

            };
        case DOWNVOTE_SUCCESS:
            return {
                ...state
            };
        case DOWNVOTE_FAIL:
            return {
                ...state, getDownvoteError: action.payload
            };

            ////////////////////
        default:
            return state;
    }
};