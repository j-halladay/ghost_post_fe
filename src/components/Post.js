import React, { Component } from "react";
import { connect } from "react-redux";
// //import { getLoggedInUser, getLoggedInUserMessages } from "../actions";
// import Nav from "./Nav";
// import { Link } from "react-router-dom";
// import MessageUpload from "./MessageUpload"
// import "antd/dist/antd.css";
// import {
//   getUserProfile,
//   UploadPictureThenGetLoggedInUser as UploadPicture,
//   toggleLikeThenUpdateMessageById as toggleLike
// } from "../actions";
// import { createMessage } from "../actions";
// import { domain } from "../actions/constants";
// import {
//   Tooltip,
//   Avatar,
//   Layout,
//   Form,
//   Input,
//   Item,
//   Button,
//   Menu,
//   Breadcrumb,
//   Card,
//   Icon,
//   Comment
// } from "antd";

// const { Header, Content, Sider, Footer } = Layout;
// const { Meta } = Card;
class SendMessage extends Component {
    state = {
      title: "",
      text: "",
      is_boast: null,
      like: 0,
      
    }
  
    // handleRegister = e => {
    //   e.preventDefault()
      
    //   if(this.state.password !== this.state.confirmPassword){
    //     this.setState({passwordMatch: false})
    //   } else{
    //     this.props.register(this.state)
    //   }
    // }
    handleRadio(event) {
        const is_boast = event.currentTarget.value === 'true' ? true: false;
        console.log('handle', is_boast);
        this.setState({ is_boast });
      }
    handleChange = e => {
    //   this.setState({passwordMatch: true})
      this.setState({ [e.target.name]: e.target.value });
    }
  
    render() {
      const {handleChange, handleRadio} = this
      
      const { err} = this.props
  
      return (
        <React.Fragment>
          <form onSubmit={this.props.postThenGoToHomePage}>
            
            <label>
            Title:
                <input type="text" value={this.state.title} onChange={this.handleChange} />
            </label>
  
            <label>
            Text:
                <input type="text" value={this.state.text} onChange={handleChange} />
            </label>
            <label>
            Name:
                <input type="text" value={this.state.title} onChange={handleChange} />
            </label>
        <div className="radio">

          <label>
            <input 
              type="radio" 
              name="is_boast" 
              value="true"
              checked={this.is_boast === true}
              onChange={handleRadio} />
            Boast
          </label>
       </div>
       <div className="radio">
         <label>
           <input 
             type="radio" 
             name="is_boast" 
             value="false"
             checked={this.is_boast === false}
             onChange={handleRadio} />
           Roast
         </label>
       </div>

  
            <button type="submit">
              Submit
            </button><br></br>
          </form>
          
          { err && <p style={{ color: "red" }}>{err}</p> }
         
        </React.Fragment>
      )
    }
  }
  
  function mapStateToProps({ auth }) {
    return {
      isLoading: auth.registerLoading,
      err: auth.registerError
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      message: messageData => dispatch(postMessage(messageData))
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SendMessage);