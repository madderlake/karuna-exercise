import React, { Component } from "react";
import Message from "./Message";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conv: {},
      meta: {},
      messages: []
      // replies: []
    };
  }
  // setConversationInfo() {
  //   this.setState({
  //     conv: {
  //       id: this.props.match.params.convId,
  //       name: this.props.match.name
  //     }
  //   });
  //   return this.state;
  // }
  getMessages = () => {
    const { convId } = this.props.match.params;
    //const { name } = this.props.match.params.name;

    const url = `https://sec.meetkaruna.com/api/v1/conversations/${convId}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          conv: { name: "Mary", id: convId },
          meta: { total: responseJson.total, page: responseJson.page },
          messages: responseJson.data.messages
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  // hideReplyForms = e => {
  //   const replyFormsAll = document.querySelectorAll(".reply-form");
  //   replyFormsAll.forEach(form => {
  //     if (!form.classList.contains("d-none")) form.classList.add("d-none");
  //   });
  // };

  // handleTextareaChange(e) {
  //   e.preventDefault();
  //   this.replyBody.current.value = e.target.value;
  //   this.msgId.current.value = e.target.value;
  // }
  // handleSubmitForm = e => {
  //   e.preventDefault();
  //   const reply = {};
  //   const date = this.dateTime.current;
  //   //const msgid = this.msgId.current;
  //   const rplybody = this.replyBody.current;
  //   reply.date = date.value;
  //   reply.body = rplybody.value;
  //   reply.id = this.msgId.current.value;
  //   this.setState({
  //     replies: [...this.state.replies, reply]
  //   });
  //   //this.hideReplyForms(e);
  //   console.log(reply.id);
  // };

  componentDidMount() {
    //this.setConversationInfo();
    this.getMessages();
  }

  render() {
    return (
      <div className="message-listing container">
        <h1>Conversation with {this.state.conv.name}</h1>
        {this.state.messages.map((message, idx) => {
          return <Message message={message} key={idx} id={message.uuid} />;
        })}
      </div>
    );
  }
}

export default MessageList;
