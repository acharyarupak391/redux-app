import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reset_state } from "../actions/index";

import Navbar from "../components/Navbar";

class Contact extends React.Component {
  constructor(props) {
    super();
    this.state = { loggedOut: false };
    // console.log("About props & states: ", props, this.state);
  }

  changeLoggedOutState = () => {
    this.setState({ loggedOut: true });
    this.props.reset_state();
  };

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
    let prop = { navprop: this.changeLoggedOutState, active: "contact" };
    return (
      <div>
        <Navbar {...prop} />
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
