import React from "react";
import { connect } from "react-redux";

import "./Home.css";
class Home extends React.Component {
  constructor(props) {
    super();
    // console.log("Home props: ", props);
  }

  componentDidMount() {
    document.title = "Home";
    this.props.onPageLoad("home");
  }

  changeLoggedOutState = () => {
    this.props.reset_state();
  };

  render() {
    if (this.props.user) {
      var user = this.props.user;
      var dateString = new Date(user.CreatedAt.split("T")[0])
        .toDateString()
        .split(" ");
    }
    return (
      <div id="home-outer-div">
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

export default connect(mapStateToProps, null)(Home);
