import React, { Component } from "react";
import Message from "./Message";

class MessageList extends Component {
  constructor(props) {
    super(props);
    //this.formatDateTime = this.formatDateTime.bind(this);
    //this.paramId = this.props.match.params.convId;
    // this.handleSubmitForm = this.handleSubmitForm.bind(this);
    // this.handleTextareaChange = this.handleTextareaChange.bind(this);
    // this.handleSubmitForm = this.handleSubmitForm.bind(this);
    // this.replyBody = React.createRef();
    // this.dateTime = React.createRef();
    // this.msgId = React.createRef();

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
  // showReplyForm = e => {
  //   this.hideReplyForms(e);
  //   const target = e.target;
  //   const replyForm = target.nextSibling;
  //   replyForm.classList.remove("d-none");
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
          return (
            <Message message={message} key={idx} id={message.uuid} />
            //   <div
            //     className={`message-block my-3 d-block ${message.direction}`}
            //     key={`message-${idx}`}
            //     data-id={message.uuid}
            //   >
            //     <p>
            //       <span>{this.formatDateTime(message.created_at)}</span>
            //       <br />
            //       {message.body}
            //       <br />
            //     </p>
            //     <div className="replies">
            //       {this.state.replies.map(reply => {
            //         return reply.id === message.uuid ? (
            //           <p data-id={reply.id}>{reply.body}</p>
            //         ) : (
            //           ""
            //         );
            //       })}
            //     </div>
            //     <button className="btn btn-link" onClick={this.showReplyForm}>
            //       Reply
            //     </button>
            //     <form
            //       className="reply-form d-none clearfix"
            //       onSubmit={this.handleSubmitForm}
            //     >
            //       <textarea
            //         className="form-control"
            //         name="replyBody"
            //         ref={this.replyBody}
            //         cols="50"
            //         value={this.replyBody.value}
            //         onChange={this.handleTextareaChange}
            //       />
            //       <input name="msgId" type="hidden" value={message.uuid} />
            //       <input
            //         name="dateTime"
            //         type="hidden"
            //         value={new Date()}
            //         ref={this.dateTime}
            //       />
            //       <input
            //         type="submit"
            //         className="btn btn-primary my-3 float-right"
            //         onClick={this.handleSubmitForm}
            //         value="Send"
            //       />
            //     </form>
            //   </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
