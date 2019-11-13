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
    this.dateTime = React.createRef();
    this.msgId = React.createRef();
  }

  showReplyForm = e => {
    this.setState({
      showForm: true
    });
    //   //   this.hideReplyForms(e);
    //   //   const target = e.target;
    //   //   const replyForm = target.nextSibling;
    //   //   replyForm.classList.remove("d-none");
  };
  handleSubmitForm = e => {
    e.preventDefault();

    //   // const date = this.dateTime.value;
    //   // //const msgid = this.msgId.current;
    //   // const rplybody = this.replyBody.current;
    const date = this.dateTime.current.value;
    const id = this.msgId.current.value;
    //   //reply.body = rplybody.value;
    //   // reply.id = this.msgId.current.value;
    this.setState({
      //replies: [...this.state.replies.reply, reply.body];
    });
    //   //this.hideReplyForms(e);
    //   //console.log(this.state.replies);
    console.log(id);
  };

  handleInputChange(newPartialInput) {
    this.setState(state => ({
      ...state,
      replies: {
        ...state.replies.reply,
        ...newPartialInput
      }
    }));
    console.log(this.state);
  }

  componentDidMount() {}
  render() {
    const message = this.props.message;
    const { replies } = this.state;
    // console.log(replies);
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
          {/* {this.state.replies.map(reply => {
            return reply.id === message.uuid ? (
              <p data-id={reply.id}>{reply.body}</p>
            ) : (
              ""
            );
          })} */}
        </div>
        <button className="btn btn-link" onClick={this.showReplyForm}>
          Reply
        </button>
        <form
          className={`reply-form clearfix ${
            !this.state.showForm ? "d-none" : ""
          }`}
          onSubmit={e => this.handleSubmitForm({})}
        >
          <textarea
            className="form-control"
            name="reply_body"
            cols="50"
            value={replies.reply.body}
            onChange={e =>
              this.handleInputChange({
                reply: { body: e.target.value }
              })
            }
          />
          <input
            name="msgId"
            type="hidden"
            ref={this.msgId}
            value={this.props.id}
          />
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
