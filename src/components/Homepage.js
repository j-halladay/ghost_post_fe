import React, { Component } from "react";
import { connect } from "react-redux";
//import { getLoggedInUser, getLoggedInUserMessages } from "../actions";

// import {
//   getUserProfile,
//   UploadPictureThenGetLoggedInUser as UploadPicture,
//   toggleLikeThenUpdateMessageById as toggleLike
// } from "../actions";
import { Post } from "./Post";
// import { domain } from "../actions/constants";

class Homepage extends Component {
  state = { text: "" };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  //   handleSubmit = e => {
  //     e.preventDefault();
  //     this.props.createMessage({ text: this.state.text });
  //     this.setState({ text: "" });
  //     document.getElementById("newMessage").value = "";
  //   };

  //   componentDidMount() {
  //     //this.props.getLoggedInUser();
  //     //this.props.getLoggedInUserMessages();
  //     this.props.getUserProfile();
  //   }

  //   handleUploadPicture = event => {
  //     event.preventDefault();
  //     const formData = new FormData(event.target);
  //     this.props.UploadPicture(formData);
  //   };

  render() {
    //const defaultPic = "http://www.badassoftheweek.com/vader.jpg";

    return (
      <React.Fragment>
        <Post></Post>
        {this.props.messages.map(message => {
          return (
            // we should be using <Message message={message} /> OR <Message displayName={message.displayName} /> to replace the <React.Fragment> section bellow
            <div>
              <h3>
                <p>{message.title}</p>
              </h3>
              <p>{message.text}</p>
              <h3>{message.is_boast ? <p>boast</p> : <p>roast</p>}</h3>
              <p>Votes: {message.like}</p>
              <button onClick={event => this.props.handelUpvote(message.id)}>
                upvote
              </button>
              <button onClick={event => this.props.handelDownvote(message.id)}>
                downvote
              </button>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    // user: state.users.user || {},
    messages: state.messages || []
    //userId: state.auth.login.id
  };
};
//inside mapDipatchToProps is where you put your action creators
// the mapDipatchToProps will inject three props which are--> getUserProfile, UploadPicture, toggleLike
const mapDispatchToProps = {
  //getLoggedInUser,
  //getLoggedInUserMessages
  // getUserProfile,
  // UploadPicture,
  // toggleLike,
  // createMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
