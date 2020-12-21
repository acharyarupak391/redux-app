import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reset_state } from "../actions/index";

import Navbar from "../components/Navbar";
import "./Home.css";
class Home extends React.Component {
  constructor(props) {
    super();
    this.state = { loggedOut: false };
    // console.log("Home props: ", props);
  }

  componentDidMount() {
    document.title = "Home";
  }

  changeLoggedOutState = () => {
    this.setState({ loggedOut: true });
    this.props.reset_state();
  };

  render() {
    let prop = { active: "home" };
    if (this.props.user) {
      var user = this.props.user;
      var dateString = new Date(user.CreatedAt.split("T")[0])
        .toDateString()
        .split(" ");
    }
    return (
      <div>
        <Navbar {...prop} />
        <div className="home-info-div">
          <p>Hello,</p>
          <p className="name">
            {user.first_name} {user.last_name}
          </p>
          <p>
            joined{" "}
            <span>
              {dateString[1]} {dateString[2]}, {dateString[3]}
            </span>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
