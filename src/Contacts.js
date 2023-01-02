import React from "react";
import "./Contacts.css";
import Bars from "./bars.svg";
import Search from "./search.svg";
import { createPortal } from "react-dom";
import { client } from "./index";
import Back from "./back.svg";

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filtered: []
    };
  }
  getData = async () => {
    const x = JSON.stringify({
      code: "C03"
    });
    client.send(x);
    /*await fetch("https://Messaging-App.mtalalmajeed.repl.co/getcontacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then((response) => response.json())
      .then((json) => {
        var newjson = json.filter(function (e) {
          return e[1] !== id;
        });
        this.setState({ data: newjson });
      })
      .catch((error) => {
        console.log(error);
      });
    //setTimeout(() => this.getData(id), 5000);*/
  };

  setItems = () => {
    console.log("DATA" + this.state.filtered);
    return this.state.filtered.map((data) => {
      return (
        <Item
          name={data[0]}
          id={data[1]}
          online={data[2]}
          phase={this.props.phase}
          chat={this.props.chat}
        />
      );
    });
  };
  openSearch = () => {
    document.getElementById("searchbar").style.right = "0%";
    document.getElementById("shade").style.opacity = "0.2";
  };
  closeSearch = () => {
    document.getElementById("searchbar").style.right = "900%";
    document.getElementById("shade").style.opacity = "0";
  };
  openMenu = () => {
    document.getElementById("sidebar").style.left = "0%";
    document.getElementById("shade").style.opacity = "0.2";
  };
  closeMenu = () => {
    document.getElementById("sidebar").style.left = "-70%";
    document.getElementById("shade").style.opacity = "0";
  };
  searchNames = (e) => {
    var temp = this.state.data;
    var search = e.target.value;
    var n = temp.filter((e) => {
      if (e[0].toUpperCase().includes(search.toUpperCase())) {
        return e;
      }
    });
    this.setState({ filtered: n });
  };

  openChat = () => {};
  render() {
    return (
      <div>
        <div id="contacts" className="message-box">
          <div id="shade"></div>
          <div id="searchbar" className="contacts-search-bar-container">
            <img
              src={Back}
              width="30px"
              className="search-bar-back-btn"
              onClick={this.closeSearch}
              alt=""
            ></img>
            <input
              className="contacts-search-bar"
              placeholder="Search"
              id="search-input"
              onKeyDown={(e) => {
                this.searchNames(e);
              }}
            ></input>
          </div>
          <div className="box-above-contacts">
            <div className="Menu-icon-position">
              <img id="menu-button" src={Bars} width="35px"></img>
            </div>
            <div id="sidebar">
              <div className="contact-profile-pic-sidebar"></div>
              <div className="contact-profile-pic-sidebar-name">
                {this.props.userid[1]}
              </div>
              <div className="contact-profile-pic-sidebar-id">
                {this.props.userid[0]}
              </div>
              <div
                onClick={() => {
                  this.props.phase(4);
                }}
                className="Menu-box-open-items"
              >
                Profile
              </div>
              <div className="message-line-before-contacts-dif"></div>
              <div className="Menu-box-open-items">Contacts</div>
              <div className="message-line-before-contacts-dif"></div>
              <div className="Menu-box-open-items">New Groups</div>
              <div className="message-line-before-contacts-dif"></div>
              <div className="Menu-box-open-items">Settings</div>
              <div
                className="contact-sidebar-logout"
                onClick={() => {
                  this.props.phase(0);
                }}
              >
                Logout
              </div>
              <div className="contact-sidebar-div"></div>
            </div>
            <div className="contacts-title-contacts">Contacts</div>
            <div className="search-icon-position" onClick={this.openSearch}>
              <img src={Search} width="25px"></img>
            </div>
          </div>
          <div className="message-line-before-contacts"></div>
          <div className="contact-list">{this.setItems()}</div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    //this.getData(this.props.userid[0]);
    var id = this.props.userid[0];
    this.getData();
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer);
      if (dataFromServer.status == "CONTACTS_SENT") {
        var json = dataFromServer.data;
        var newjson = json.filter(function (e) {
          return e[1] !== id;
        });
        this.setState({ data: newjson });
        this.setState({ filtered: newjson });
      }
    };
    document.getElementById("contacts").addEventListener("click", (event) => {
      if (
        event.target.id != "menu-button" &&
        event.target.className != "Menu-box-open-items" &&
        event.target.className != "message-button-contacts" &&
        event.target.id != "sidebar"
      ) {
        this.closeMenu();
      }
    });
    document
      .getElementById("menu-button")
      .addEventListener("click", (event) => {
        this.openMenu();
      });
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="contacts-box-container">
        <div className="contact-profile-pic"></div>
        <div className="contact-profile-name">{this.props.name}</div>
        <div className="contact-profile-status">{this.props.online}</div>
        <div className="message-line-after-contacts"></div>
        <button
          className="message-button-contacts"
          onClick={() => {
            this.props.chat([this.props.id, this.props.name]);
            this.props.phase(3);
          }}
        >
          Message
        </button>
      </div>
    );
  }
}
