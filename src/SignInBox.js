import React from "react";
import "./SignInBox.css";
import { client } from "./index";

export default class SignInBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notice: ""
    };
    this.EMAIL = React.createRef();
    this.PASSWORD = React.createRef();
    this.BUTTON = React.createRef();
  }
  sendData = async () => {
    this.BUTTON.current.setAttribute("disabled", "");
    const email = this.EMAIL.current.value;
    const password = this.PASSWORD.current.value;

    const x = JSON.stringify({
      code: "C01",
      email: email,
      password: password
    });
    client.send(x);
    console.log("SENT DATA");
  };
  render() {
    return (
      <div>
        <div className="message-box">
          <div className="heading">Sign In</div>

          <input
            type="text"
            placeholder="Enter Email"
            ref={this.EMAIL}
            className="main-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            ref={this.PASSWORD}
            className="main-input"
          />
          <a href="#" className="forgot">
            Forgot Password?
          </a>
          <div className="message-line"></div>
          <button
            ref={this.BUTTON}
            className="main-button"
            onClick={this.sendData}
          >
            Login
          </button>
          <div className="notice">{this.state.notice}</div>

          <div className="details">
            Not a member?
            <button
              onClick={() => {
                this.props.phase(1);
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    console.log("LISTENING FOR RESPONSE");
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
      if (dataFromServer.code == "S01") {
        if (dataFromServer.status == "CONN_ACCEPTED") {
          this.props.id([
            dataFromServer.id,
            dataFromServer.username,
            "test@gmail.com"
          ]);
          this.props.phase(2);
        } else if (dataFromServer.status == "NULL") console.log("ERROR");
        this.setState({
          notice: "Invalid Username or Password!"
        });
        this.BUTTON.current.removeAttribute("disabled");
      }
    };
  }
}
