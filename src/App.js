import React, { Component } from "react";
import ConvoList from "./components/ConvoList";
import MessageList from "./components/MessageList";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meta: {},
      data: [],
      convId: ""
    };
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="app">
        <ConvoList />
        <MessageList />
      </div>
    );
  }
}

export default App;
