import React, { Component } from "react";
import { Link } from "react-router-dom";

class ConvoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      convos: []
    };
  }
  getConversations() {
    fetch("https://sec.meetkaruna.com/api/v1/conversations")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          meta: { total: responseJson.total, page: responseJson.page },
          convos: responseJson.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getConversations();
  }

  formatDateTime = dateStr => {
    const opts = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return new Date(dateStr).toLocaleDateString([], opts);
  };

  truncateMsg = (str, num) => {
    return str
      .split(" ")
      .splice(0, num)
      .join(" ");
  };
  clickHandler = id => {
    this.props.history.push(`/messages/${id}`);
  };

  render() {
    //const convos = this.state.data;

    return (
      <div className="convo-listing container">
        <h1>Karuna Conversations ({this.state.meta.total})</h1>
        {this.state.convos.map((convo, idx) => {
          return (
            <div className={`my-3 d-block`} key={`convo-${idx}`}>
              <Link to={`/messages/${convo.uuid}`} onClick={this.clickHandler}>
                {convo.name} - Unread: {convo.unread}
              </Link>
              <br />
              <span>
                <strong>Last Message: </strong>{" "}
                {this.formatDateTime(convo.last_message.created_at)}{" "}
                &mdash;&nbsp; "{this.truncateMsg(convo.last_message.body, 5)}{" "}
                ..."
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ConvoList;
