import React, { Component } from "react";

// import logo from './logo.svg';
import "./App.css";
import { domain, jsonHeaders, handleJsonResponse } from "./actions/constants";
const url = domain + "/messages";

const API_HOST = "http://localhost:8000";

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: "include"
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

async function testRequest(method) {
  const response = await fetch(`${API_HOST}/ping/`, {
    method: method,
    headers: method === "POST" ? { "X-CSRFToken": await getCsrfToken() } : {},
    credentials: "include"
  });
  const data = await response.json();
  return data.result;
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      title: "",
      text: "",
      is_boast: null,
      like: 0,
      rb: true,
      rb_toggle: "all",
      testGet: "KO",
      testPost: "KO"
    };
    this.handelMessage = this.handelMessage.bind(this);
    this.sortByDownvote = this.sortByDownvote.bind(this);
    this.sortByUpvote = this.sortByUpvote.bind(this);
  }

  allToggle = () => {
    this.setState(state => ({ rb: !state.rb }));
  };
  boastToggle = () => {
    this.setState(state => ({ rb_toggle: "boast" }));
  };
  roastToggle = () => {
    this.setState(state => ({ rb_toggle: "roast" }));
  };
  async componentDidMount() {
    this.setState({
      testGet: await testRequest("GET"),
      testPost: await testRequest("POST")
    });

    this.getAllMessages();
  }
  // componentDidUpdate() {
  //   this.getAllMessages();
  // }
  getAllMessages = async function() {
    return fetch(url + "/", {
      method: "GET",
      headers: { ...jsonHeaders, "X-CSRFToken": await getCsrfToken() }
    })
      .then(handleJsonResponse)
      .then(data => {
        let messages = data;
        this.setState({ messages: messages });
      });
  };
  sortByUpvote = () => {
    this.setState({
      messages: [].concat(this.state.messages).sort((a, b) => a.like > b.like)
    });
  };
  sortByDownvote = () => {
    this.setState({
      messages: [].concat(this.state.messages).sort((a, b) => a.like < b.like)
    });
  };

  handelUpvote = async function(messageId) {
    fetch(url + `/${messageId}/upvote/`, {
      method: "POST",
      headers: { ...jsonHeaders, "X-CSRFToken": await getCsrfToken() }
      // body: JSON.stringify(postData)
    }).then(handleJsonResponse);
  };

  handelDownvote = async function(messageId) {
    return fetch(url + `/${messageId}/downvote/`, {
      method: "POST",
      headers: { ...jsonHeaders, "X-CSRFToken": await getCsrfToken() }
      // body: JSON.stringify(postData)
    }).then(handleJsonResponse);
  };
  handleRadio = event => {
    const is_boast = event.currentTarget.value === "true" ? true : false;
    console.log("handle", is_boast);
    this.setState({ is_boast });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handelMessage = function(e) {
    e.preventDefault();
    async function sendMessage(data) {
      fetch(url + "/", {
        method: "POST",
        headers: { ...jsonHeaders, "X-CSRFToken": await getCsrfToken() },
        body: JSON.stringify(data)
        // body: JSON.stringify(postData)
      })
        .then(handleJsonResponse)
        .then((window.location.href = "http://localhost:3000"));
    }
    console.log(this.state);
    sendMessage({
      title: this.state.title,
      text: this.state.text,
      is_boast: this.state.is_boast,
      like: this.state.like
    });
  };

  render() {
    const {
      handleRadio,
      sortByUpvote,
      sortByDownvote,
      handelUpvote,
      handelDownvote,
      allToggle,
      boastToggle,
      roastToggle,
      handleChange,
      handelMessage
    } = this;
    return (
      <React.Fragment>
        <form onSubmit={this.handelMessage}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Text:
            <input
              type="text"
              name="text"
              value={this.state.text}
              onChange={handleChange}
            />
          </label>
          {/* <label>
            Name:
            <input
              type="text"
              
              value={this.state.title}
              onChange={handleChange}
            />
          </label> */}
          <div className="radio">
            <label>
              <input
                type="radio"
                name="is_boast"
                value="true"
                // checked={this.is_boast === true}
                onChange={handleRadio}
              />
              Boast
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="is_boast"
                value="false"
                // checked={this.is_boast === false}
                onChange={handleRadio}
              />
              Roast
            </label>
          </div>

          <button type="submit">Submit</button>
          <br></br>
        </form>
        <button onClick={sortByUpvote}> Upvotes </button>
        <button onClick={sortByDownvote}> Downvotes </button>
        <button onClick={allToggle}> all </button>
        <div>
          {
            {
              all: this.state.messages.map(message => {
                return (
                  // we should be using <Message message={message} /> OR <Message displayName={message.displayName} /> to replace the <React.Fragment> section bellow

                  <div>
                    <h3>
                      <p>{message.title}</p>
                    </h3>
                    <p>{message.text}</p>
                    <h3>{message.is_boast ? <p>boast</p> : <p>roast</p>}</h3>
                    <p>Votes: {message.like}</p>
                    <button onClick={event => handelUpvote(message.id)}>
                      upvote
                    </button>
                    <button onClick={event => handelDownvote(message.id)}>
                      downvote
                    </button>
                  </div>
                );
              }),
              boast: this.state.messages
                .filter(function(message) {
                  return message.is_boast === true;
                })
                .map(message => {
                  // console.log(message);
                  return (
                    // we should be using <Message message={message} /> OR <Message displayName={message.displayName} /> to replace the <React.Fragment> section bellow

                    <div>
                      <h3>
                        <p>{message.title}</p>
                      </h3>
                      <p>{message.text}</p>
                      <h3>{message.is_boast ? <p>boast</p> : <p>roast</p>}</h3>
                      <p>Votes: {message.like}</p>
                      <button onClick={event => handelUpvote(message.id)}>
                        upvote
                      </button>
                      <button onClick={event => handelDownvote(message.id)}>
                        downvote
                      </button>
                    </div>
                  );
                }),
              roast: this.state.messages
                .filter(function(message) {
                  return message.is_boast === false;
                })
                .map(message => {
                  return (
                    // we should be using <Message message={message} /> OR <Message displayName={message.displayName} /> to replace the <React.Fragment> section bellow

                    <div>
                      <h3>
                        <p>{message.title}</p>
                      </h3>
                      <p>{message.text}</p>
                      <h3>{message.is_boast ? <p>boast</p> : <p>roast</p>}</h3>
                      <p>Votes: {message.like}</p>
                      <button onClick={event => handelUpvote(message.id)}>
                        upvote
                      </button>
                      <button onClick={event => handelDownvote(message.id)}>
                        downvote
                      </button>
                    </div>
                  );
                })
            }[this.state.rb_toggle]
          }
        </div>
      </React.Fragment>
    );
  }
}

export default App;
