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
    this.reply_body = React.createRef();
  }

  showReplyForm = e => {
    this.setState({
      showForm: true
    });
  };
  handleSubmitForm = e => {
    e.preventDefault();
    const date = this.dateTime.current.value;
    const id = this.msgId.current.value;
    const body = this.reply_body.current.value;
    this.setState({
      ...this.state,
      replies: {
        ...this.state.replies,
        reply: { date: date, id: id, body: body }
      }
    });
    console.log(this.state);
  };

  handleInputChange(input) {
    this.setState(state => ({
      ...state,
      replies: {
        ...state.replies.reply,
        ...input
      }
    }));
    console.log(this.state);
  }

  componentDidMount() {}
  render() {
    const message = this.props.message;
    const replies = this.state.replies;
    console.log(replies);
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
          {this.state.replies.length
            ? this.props.replies.map(reply => {
                return <p data-id={reply.id}>{reply.body}</p>;
              })
            : ""}
        </div>
        <button className="btn btn-link" onClick={this.showReplyForm}>
          Reply
        </button>
        <form
          className={`reply-form clearfix ${
            !this.state.showForm ? "d-none" : ""
          }`}
          onSubmit={e => this.handleSubmitForm}
        >
          <textarea
            className="form-control"
            name="reply_body"
            cols="50"
            //ref={this.reply_body}
            value={replies.reply.body}
            onChange={reply:{body: e.target.value}}
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
