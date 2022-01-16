import {Component} from "react";
import React from "react";

export default class Messages extends Component {

  render() {
    const {messages} = this.props;

    return (
      <ul className="Messages-list">
        {messages.map(message=> this.renderMessage(message))}
      </ul>
    );
  }

  renderMessage(message) {
    const {member, text, id} = message;
    const {userId} = this.props;
    const messageFromMe = member.id === userId.id;
    const className = messageFromMe ? 
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className} key={id}>
      <span 
        className="avatar"
        style={{backgroundColor: member.clientData.color}}>
      </span>
      <div className="Message-content"> 
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
      </div>
      </li>
    );
  }
}