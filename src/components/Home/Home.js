import React from "react";
import { connect } from "react-redux";
import { change_language } from "../../store/actions/index";

import serveLanguage from "../../lang/index";

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
    var user = this.props.user;
    var dateString = new Date(user.CreatedAt.split("T")[0])
      .toDateString()
      .split(" ");
    return (
      <div id="home-outer-div">
        <div className="home-info-div">
          <p>{serveLanguage(this.props.language, "hello")},</p>
          <p className="name">
            {user.first_name} {user.last_name}
          </p>
          <p>
            {serveLanguage(this.props.language, "joined")}{" "}
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
    language: state.language,
  };
}

const mapDispatchToProps = {
  change_language,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
