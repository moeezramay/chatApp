import React from "react";
import { createRoot } from "react-dom/client";
import MessageBox from "./MessageBox";
import SignInBox from "./SignInBox";
import SignUpBox from "./SignUpBox";
import Contacts from "./Contacts";
import Profile from "./Profile";
import Loader from "./Loader";
import "./styles.css";
//IMPORTING WEBSOCKET
import { w3cwebsocket as W3CWebSocket } from "websocket";

//INITIALIZING CLIENT COMPONENT
export const client = new W3CWebSocket(
  "wss://Algorithm-Test.mtalalmajeed.repl.co/"
);

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      phase: -1,
      userid: [],
      active: []
    };
  }
  changePhase = (x) => {
    this.setState({ phase: x });
  };
  changeUserId = (x) => {
    this.setState({ userid: x }, () => {
      console.log(this.state.userid);
    });
  };
  openChat = (x) => {
    this.setState({ active: x }, () => {});
  };
  render() {
    if (this.state.phase === -1) {
      return <Loader />;
    }
    if (this.state.phase === 0) {
      return <SignInBox phase={this.changePhase} id={this.changeUserId} />;
    }
    if (this.state.phase === 1) {
      return <SignUpBox phase={this.changePhase} id={this.changeUserId} />;
    }
    if (this.state.phase === 2) {
      return (
        <Contacts
          phase={this.changePhase}
          chat={this.openChat}
          userid={this.state.userid}
        />
      );
    }
    if (this.state.phase === 3) {
      return (
        <MessageBox
          phase={this.changePhase}
          userid={this.state.userid}
          active={this.state.active}
        />
      );
    }
    if (this.state.phase === 4) {
      return (
        <Profile
          phase={this.changePhase}
          userid={this.state.userid}
          active={this.state.active}
        />
      );
    }
  }
  componentDidMount() {
    var x = this.changePhase;
    client.onopen = function () {
      x(0);
    };
  }
}

var DOM = createRoot(document.getElementById("root"));
DOM.render(<Main />);
