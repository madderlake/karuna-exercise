import React, { Component } from "react";
import io from "socket.io-client";
import { formatDateTime } from "../utils.js";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      reply: {},
      replylist: []
    };

    const addMessage = data => {
      this.setState({
        replylist: [...this.state.replylist, data]
      });
      console.log(this.state.replylist);
    };

    this.socket = io("localhost:8083");
    this.socket.on("RECEIVE_REPLY", function(data) {
      addMessage(data);
    });

    this.sendMessage = ev => {
      ev.preventDefault();
      if (this.state.reply) {
        this.socket.emit("SEND_REPLY", {
          reply: this.state.reply
        });
        // this.setState({
        //   reply: ""
        // });
        console.log(this.state.reply);
      }
    };

    this.showReplyForm = e => {
      this.setState({
        showForm: true
      });
    };
  } //end constructor

  componentDidMount() {
    console.log(this.state);
  }
  render() {
    const message = this.props.message;
    const replylist = this.state.replylist;
    //console.log(replylist);
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
          {replylist.map((reply, idx) => {
            return reply.id === message.uuid ? (
              <p key={`reply-${idx}`} data-id={reply.id}>
                {reply.body}
              </p>
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
          onSubmit={this.sendMessage}
        >
          <textarea
            className="form-control"
            name="reply_body"
            cols="50"
            onChange={e =>
              this.setState({
                reply: {
                  body: e.target.value,
                  id: this.props.id,
                  date: formatDateTime(new Date())
                }
              })
            }
          />
          <input
            type="submit"
            className="btn btn-primary my-3 float-right"
            value="Send"
          />
        </form>
      </div>
    );
  }
}

export default Message;
