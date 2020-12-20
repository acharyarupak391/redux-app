import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { reset_state } from "../actions/index";

class Home extends React.Component {
  constructor(props) {
    super();
    // console.log("Home props: ", props);
  }

  onLogout() {
    return this.props.reset_state();
  }

  render() {
    if (!this.props.user) {
      return (
        <Redirect to={{ pathname: "/login", state: { redirected: true } }} />
      );
    }
    return (
      <div>
        <h1> Hello from Home component </h1>
        <button onClick={() => this.onLogout()}>Logout</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
