import React from "react";
import "./SignUpBox.css";
import { client } from "./index";

export default class SignUpBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      notice: ""
    };
    this.FIRSTNAME = React.createRef();
    this.LASTNAME = React.createRef();
    this.EMAIL = React.createRef();
    this.PASSWORD1 = React.createRef();
    this.PASSWORD2 = React.createRef();
    this.BUTTON = React.createRef();
  }
  sendData = async () => {
    this.BUTTON.current.setAttribute("disabled", "");
    this.setState({
      notice: ""
    });
    const name =
      this.FIRSTNAME.current.value + " " + this.LASTNAME.current.value;
    const p1 = this.PASSWORD1.current.value;
    const p2 = this.PASSWORD2.current.value;
    const email = this.EMAIL.current.value;
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (
      p1 === "" ||
      p2 === "" ||
      email === "" ||
      this.FIRSTNAME.current.value === "" ||
      this.LASTNAME.current.value === ""
    ) {
      this.setState({
        notice: "Please fill the required fields."
      });
      this.BUTTON.current.removeAttribute("disabled");
      return 0;
    }
    if (!validateEmail(email)) {
      console.log("ERROR");
      this.setState({
        notice: "Invalid Email Address."
      });
      this.BUTTON.current.removeAttribute("disabled");
      return 0;
    }
    if (p1 != p2) {
      console.log("ERROR");
      this.setState({
        notice: "Both Passwords Do Not Match."
      });
      this.BUTTON.current.removeAttribute("disabled");
      return 0;
    }

    const x = JSON.stringify({
      code: "C02",
      username: name,
      password: p1,
      email: email
    });
    client.send(x);
    console.log("SENT DATA");

    /*await fetch("https://Messaging-App.mtalalmajeed.repl.co/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        password: p1,
        email: email
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json[0] == "DATA REGISTERED") {
          //this.BUTTON.current.removeAttribute("disabled");
          this.props.id([json[1], json[2], email]);
          this.props.phase(2);
        } else if (json == "USER ERROR") {
          this.setState({
            notice: "Username Already Taken!"
          });
          this.BUTTON.current.removeAttribute("disabled");
          return 0;
        } else if (json == "EMAIL ERROR") {
          this.setState({
            notice: "Email Already Registered!"
          });
          this.BUTTON.current.removeAttribute("disabled");
          return 0;
        }
      })
      .catch((error) => {
        this.BUTTON.current.removeAttribute("disabled");
        console.log(error);
      });*/
  };
  render() {
    return (
      <div>
        <div className="message-box">
          <div className="heading">Sign Up</div>

          <div className="user-box">
            <input
              type="text"
              placeholder="First Name"
              ref={this.FIRSTNAME}
              className="user-input"
            />

            <input
              type="text"
              placeholder="Last Name"
              ref={this.LASTNAME}
              className="user-input"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            ref={this.EMAIL}
            className="main-input"
          />
          <div className="message-line"></div>
          <input
            type="password"
            placeholder="Enter Password"
            ref={this.PASSWORD1}
            className="main-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={this.PASSWORD2}
            className="main-input"
          />
          <div className="message-line"></div>
          <button
            ref={this.BUTTON}
            className="main-button"
            onClick={this.sendData}
          >
            Register
          </button>
          <div className="notice">{this.state.notice}</div>

          <div className="details">
            Already a member?
            <button
              onClick={() => {
                this.props.phase(0);
              }}
            >
              SignIn
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
      if (dataFromServer.code == "S02") {
        if (dataFromServer.status == "REG_ACCEPTED") {
          //this.BUTTON.current.removeAttribute("disabled");
          this.props.id([
            dataFromServer.id,
            dataFromServer.username,
            "test@gmail.com"
          ]);
          this.props.phase(2);
        } else if (dataFromServer.status == "USER_ERR") {
          this.setState({
            notice: "Username Already Taken!"
          });
          this.BUTTON.current.removeAttribute("disabled");
        } else if (dataFromServer.status == "EMAIL_ERR") {
          this.setState({
            notice: "Email Already Registered!"
          });
          this.BUTTON.current.removeAttribute("disabled");
        }
        this.BUTTON.current.removeAttribute("disabled");
      }
    };
  }
}
