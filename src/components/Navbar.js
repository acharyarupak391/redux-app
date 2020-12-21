import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reset_state } from "../actions/index";
import { Redirect } from "react-router-dom";

import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
class Navbar extends React.Component {
  constructor(props) {
    super();
    console.log("Navbar props: ", props);
    if (props.active !== "none") {
      this.state.logoutPressed = false;
    }
  }

  onLogout = () => {
    this.state.logoutPressed = true;
    this.props.reset_state();
  };

  render() {
    if (
      this.props.active !== "none" &&
      this.state.logoutPressed &&
      !this.props.user
    ) {
      return (
        <Redirect to={{ pathname: "/login", state: { redirected: false } }} />
      );
    }
    if (this.props.active !== "none" && !this.props.user) {
      return (
        <Redirect to={{ pathname: "/login", state: { redirected: true } }} />
      );
    }
    if (this.props.active == "none" && this.props.user) {
      return <Redirect to="/" />;
    }
    var logoutBtn = null;
    if (this.props.active !== "none") {
      logoutBtn = (
        <Button variant="outlined" color="inherit" onClick={this.onLogout}>
          Logout
        </Button>
      );
    }
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="toolbar">
            <Link
              className={this.props.active == "home" ? "link active" : "link"}
              to="/"
            >
              Home
            </Link>
            <Link
              className={this.props.active == "about" ? "link active" : "link"}
              to="/about"
            >
              About Us
            </Link>
            <Link
              className={
                this.props.active == "contact" ? "link active" : "link"
              }
              to="/contact"
            >
              Contact Us
            </Link>
            <span></span>
            {logoutBtn}
          </Toolbar>
        </AppBar>
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
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
