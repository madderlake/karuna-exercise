import React, { Component } from "react";
import { formatDateTime } from "../utils.js";

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //conv: {},
      //meta: {},
      //messages: [],
      showForm: false,
      replies: {
        reply: {
          id: "",
          date: "",
          body: ""
        }
      }
    };
  }

  showReplyForm = e => {
    this.setState({
      showForm: true
    });
    //   this.hideReplyForms(e);
    //   const target = e.target;
    //   const replyForm = target.nextSibling;
    //   replyForm.classList.remove("d-none");
  };
  handleSubmitForm = e => {
    e.preventDefault();
    // const date = this.dateTime.value;
    // //const msgid = this.msgId.current;
    // const rplybody = this.replyBody.current;
    // reply.date = date.value;
    // reply.body = rplybody.value;
    // reply.id = this.msgId.current.value;
    this.setState({
      replies: [...this.state.replies.reply, reply.body]
    });
    //this.hideReplyForms(e);
    console.log(this.state.replies);
  };

  componentDidMount() {}
  render() {
    const message = this.props.message;
    return (
      <div
        className={`message-block my-3 d-block ${message.direction}`}
        //key={`message-${idx}`}
        data-id={message.uuid}
      >
        <p>
          <span>{formatDateTime(message.created_at)}</span>
          <br />
          {message.body}
          <br />
        </p>
        <div className="replies">
          {this.state.replies.map(reply => {
            return reply.id === message.uuid ? (
              <p data-id={reply.id}>{reply.body}</p>
            ) : (
              ""
            );
          })}
        </div>
        <button className="btn btn-link" onClick={this.showReplyForm}>
          Reply
        </button>
        <form
          className={`reply-form clearfix ${
            !this.state.showForm ? "d-none" : ""
          }`}
          onSubmit={this.handleSubmitForm}
        >
          <textarea
            className="form-control"
            name="replyBody"
            ref={this.replyBody}
            cols="50"
            //value={this.replyBody.value}
            onChange={this.handleTextareaChange}
          />
          <input name="msgId" type="hidden" value={message.uuid} />
          <input
            name="dateTime"
            type="hidden"
            value={formatDateTime(new Date())}
            ref={this.dateTime}
          />
          <input
            type="submit"
            className="btn btn-primary my-3 float-right"
            onClick={this.handleSubmitForm}
            value="Send"
          />
        </form>
      </div>
    );
  }
}

export default Message;
