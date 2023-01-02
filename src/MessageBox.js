import React from "react";
import "./MessageBox.css";
import Back from "./back.svg";
import { client } from "./index";

export default class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        ["Hello", 0],
        ["How are You?", 0],
        ["Hi!!", 1]
      ],
      username: "Loading...."
    };
    this.MESSAGEINPUT = React.createRef();
    this.MESSAGEBODY = React.createRef();
  }
  sendMessage = () => {
    var x = this.state.data;
    var y = [];
    if (this.MESSAGEINPUT.current.value === "") {
      return;
    }
    y.push(this.MESSAGEINPUT.current.value);
    y.push(this.props.userid[0]);
    x.push(y);

    var msg = this.MESSAGEINPUT.current.value;
    console.log(msg);

    this.setState({ data: x });
    this.MESSAGEINPUT.current.value = "";
    this.MESSAGEBODY.current.scroll({
      top: this.MESSAGEBODY.current.scrollHeight,
      behavior: "smooth"
    });
    this.addMessage(msg);
  };
  getData = async () => {
    const x = JSON.stringify({
      code: "C04",
      id: [this.props.userid[0], this.props.active[0]]
    });
    client.send(x);
    /*await fetch("https://Messaging-App.mtalalmajeed.repl.co/getdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: [this.props.userid[0], this.props.active[0]]
      })
    })
      .then((response) => response.json())
      .then((json) => {
        var polished = json;
        polished.shift();
        this.setState({ data: polished });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("DONE 123");
    setTimeout(() => this.getData(), 5000);*/
  };

  addMessage = async (m) => {
    const x = JSON.stringify({
      code: "C05",
      id: [this.props.userid[0], this.props.active[0]],
      message: [m, this.props.userid[0]]
    });
    console.log(x);
    client.send(x);
    /*await fetch("https://Messaging-App.mtalalmajeed.repl.co/addmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: [this.props.userid[0], this.props.active[0]],
        message: [m, this.props.userid[0]]
      })
    })
      .then((response) => response.json())
      .then((json) => {
        //WHAT TO DO
      })
      .catch((error) => {
        console.log(error);
      });*/
  };

  setMessage = () => {
    var n = 1;
    return this.state.data.map((data) => {
      n++;
      return (
        <Message
          key={n}
          text={data[0]}
          size={data[1]}
          active={this.props.active}
          userid={this.props.userid}
        />
      );
    });
  };
  render() {
    return (
      <div>
        <div className="message-box">
          <button
            className="back-button-message-box"
            onClick={() => {
              this.props.phase(2);
            }}
          >
            <img src={Back} width="30px"></img>
          </button>
          <div className="message-header">
            <div className="image-box"></div>
            <div className="data-box">
              <div className="message-title">{this.props.active[1]}</div>
              <div className="message-details">{this.props.active[0]}</div>
            </div>
          </div>
          <div className="message-line"></div>
          <div className="message-body" ref={this.MESSAGEBODY}>
            {this.setMessage()}
          </div>
          <div className="message-line"></div>
          <div className="message-send">
            <input
              className="message-input"
              ref={this.MESSAGEINPUT}
              placeholder="Enter Message"
            />
            <button className="message-button" onClick={this.sendMessage}>
              SEND
            </button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
      if (dataFromServer.code == "S04") {
        var polished = dataFromServer.data;
        polished.shift();
        this.setState({ data: polished });
      }
    };
    document
      .getElementsByClassName("message-input")[0]
      .addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.sendMessage();
        }
      });
    this.getData();
    console.log(this.props.userid);
    console.log(this.props.active);
  }
}

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.size === this.props.active[0]) {
      return (
        <div className="message-left">
          <span>{this.props.text}</span>
        </div>
      );
    }
    if (this.props.size === this.props.userid[0]) {
      return (
        <div className="message-right">
          <span>{this.props.text}</span>
        </div>
      );
    }
  }
}
