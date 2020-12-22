import React from "react";
import { connect } from "react-redux";

import "./Contact.css";

class Contact extends React.Component {
  constructor(props) {
    super();
    // console.log("Contact props: ", props);
  }

  componentDidMount() {
    document.title = "Contact";
    this.props.onPageLoad("contact");
  }

  changeLoggedOutState = () => {
    this.setState({ loggedOut: true });
    this.props.reset_state();
  };

  sendEmail(e) {
    e.preventDefault();
    window.open(e.target.parentElement.href);
  }

  blink(e) {
    e.target.select();
    document.execCommand("copy");
  }

  render() {
    if (this.props.user) var emailHref = "mailto:" + this.props.user.email;
    return (
      <div>
        {this.props.message ? (
          <div className="about-message">{this.props.message}</div>
        ) : (
          <br />
        )}
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
    message: state.message,
  };
}

export default connect(mapStateToProps, null)(Contact);
