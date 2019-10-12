import {
    combineReducers
} from "redux";
import {
    connectRouter
} from "connected-react-router";
import post from "./post";
import homepage from "./homepage";
// import messages from "./messages";
// import users from "./users";

export default history =>
    combineReducers({
        router: connectRouter(history),
        post,
        homepage,
        // messages,
        // users
    });