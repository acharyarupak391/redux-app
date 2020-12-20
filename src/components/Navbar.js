import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
class Navbar extends React.Component {
  constructor(props) {
    super();
    // console.log("Navbar props: ", props);
  }

  onLogout = () => {
    return this.props.navprop();
  };

  render() {
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
              Contact
            </Link>
            <span></span>
            <Button variant="outlined" color="inherit" onClick={this.onLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
