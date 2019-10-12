import {
    CREATE_MESSAGE,
    CREATE_MESSAGE_FAIL,
    CREATE_MESSAGE_SUCCESS
} from "../actions"

const initialState = {

    messageLoading: false,
    message: null,
    messageError: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CREATE_MESSAGE:
            return {
                ...state,
                messageLoading: true,
                    messageError: null
            }
            case CREATE_MESSAGE_SUCCESS:
                return {
                    ...state,
                    messages: [action.payload.message, ...state.messages],
                        messageLoading: false,

                }
                case CREATE_MESSAGE_FAIL:
                    return {
                        ...state,
                        messageError: action.payload,
                            messageLoading: false
                    }

                    default:
                        return state
    }
}