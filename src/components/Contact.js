import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reset_state } from "../actions/index";

import Navbar from "../components/Navbar";
import "./Contact.css";

class Contact extends React.Component {
  constructor(props) {
    super();
    this.state = { loggedOut: false };
    // console.log("Contact props: ", props);
  }

  changeLoggedOutState = () => {
    this.setState({ loggedOut: true });
    this.props.reset_state();
  };

  sendEmail(e) {
    e.preventDefault();
    window.open(e.target.parentElement.href);
  }

  render() {
    if (this.state.loggedOut && !this.props.user) {
      return (
        <Redirect to={{ pathname: "/login", state: { redirected: false } }} />
      );
    }
    if (!this.props.user) {
      return (
        <Redirect to={{ pathname: "/login", state: { redirected: true } }} />
      );
    }
    let emailHref = "mailto:" + this.props.user.email;
    let prop = { navprop: this.changeLoggedOutState, active: "contact" };
    return (
      <div>
        <Navbar {...prop} />
        <div className="contact-div">
          <p id="emailP">
            <input
              onClick={(e) => this.blink(e)}
              id="email"
              readOnly
              value={this.props.user.email}
              style={{
                width: this.props.user.email.length * 14.75 + "px",
              }}
            />
            <span id="copied">
              <i className="fas fa-clipboard-check"></i>
              <i>Copied!</i>
            </span>
          </p>
          <a href={emailHref}>
            <i
              className="far fa-envelope"
              onClick={(e) => this.sendEmail(e)}
            ></i>
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  reset_state,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
