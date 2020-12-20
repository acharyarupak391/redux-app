import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super();
    console.log("Home props: ", props);
  }

  render() {
    return (
      <div>
        <Link to="/">Home </Link>
        <Link to="/about">About Us </Link>
      </div>
    );
  }
}
