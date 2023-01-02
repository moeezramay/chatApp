import React from "react";
import "./Profile.css";
import Back from "./back.svg";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  backButton = () => {
    this.props.phase(2);
  };
  render() {
    return (
      <div>
        <div id="contacts" className="message-box">
          <button
            onClick={() => {
              this.props.phase(2);
            }}
            className="profile-section-back-button"
          >
            <img src={Back} width="30px" alt=""></img>
          </button>
          <div className="profile-pic-profile"></div>
          <div className="profile-name-profile">{this.props.userid[1]}</div>
          <div className="profile-id-profile">{this.props.userid[0]}</div>
          <input
            className="profile-title-profile"
            type="text"
            placeholder="Say something about your self.."
          ></input>
          <div className="message-line-after-title"></div>
          <div className="profile-email-profile">
            <span> {this.props.userid[2]}</span>
          </div>
          <div className="message-line-after-email"></div>
          <textarea
            className="profile-bio-profile"
            placeholder="Briefly Describe Yourself..."
          />
          <button
            className="profile-submit-button"
            onClick={() => {
              this.props.phase(2);
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
