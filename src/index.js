import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import ConvoList from "./components/ConvoList";
import MessageList from "./components/MessageList";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.scss";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <Route exact path="/" component={ConvoList} />
    <Route exact path="/conversations" component={ConvoList} />
    <Route exact path="/messages/:convId" component={MessageList} />
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
