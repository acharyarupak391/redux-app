import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reset_state } from "../actions/index";

import Navbar from "../components/Navbar";
import "./About.css";

class About extends React.Component {
  constructor(props) {
    super();
    this.state = { loggedOut: false };
    // console.log("About props: ", props);
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
    let prop = { navprop: this.changeLoggedOutState, active: "about" };
    let user = this.props.user;
    console.log(user);
    let dateString = new Date(user.CreatedAt.split("T")[0])
      .toDateString()
      .split(" ");
    return (
      <div>
        <Navbar {...prop} />
        <div className="about-div">
          <div className="info-panel">
            <p>
              {user.first_name} {user.last_name}
            </p>
            <p>
              ID: <span>{user.ID}</span>
            </p>
            <p>
              Working at: <span>{user.company}</span>
            </p>
            <p>
              Designation: <span>{user.designation}</span>
            </p>
            <p>
              Joined At:{" "}
              <span>
                {dateString[0]}, {dateString[1]} {dateString[2]},{" "}
                {dateString[3]}
              </span>
            </p>
            <i className="fas fa-info-circle"></i>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
