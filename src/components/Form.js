import React from "react";
import "./Form.css";
import { connect } from "react-redux";
import { initiate_login, reset_state } from "../actions/index";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

import { Redirect } from "react-router-dom";

const MyTextField = styled(TextField)({
  width: "80%",
  fontFamily: "Open Sans",
});

class Form extends React.Component {
  constructor(props) {
    super();

    // console.log("props: ", props);

    this.state = {
      email: "",
      password: "",
      validationWarning: "",
      warningLabelClass: "",
      inputField: undefined,
    };
  }

  componentDidMount() {
    // if (this.props.user) {
    //   this.setState({
    //     validationWarning:
    //       "Welcome, " +
    //       this.props.user.first_name +
    //       " " +
    //       this.props.user.last_name +
    //       " | ID: " +
    //       this.props.user.ID,
    //     warningLabelClass: "warningOn success",
    //   });
    // }
    if (this.props.location.state && this.props.location.state.redirected) {
      this.setState({
        validationWarning: "Please login first!",
        warningLabelClass: "warningOn",
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.status && prevProps.status !== this.props.status) {
      this.props.status == 200
        ? this.setState({
            validationWarning:
              "Welcome, " +
              this.props.user.first_name +
              " " +
              this.props.user.last_name +
              " | ID: " +
              this.props.user.ID,
            warningLabelClass: "warningOn success",
          })
        : this.setState({
            validationWarning:
              "Error " + this.props.status + ": " + this.props.error.message,
            warningLabelClass: "warningOn",
          });
    }
  }

  onSubmit(e) {
    // e.preventDefault();
    this.setState({ validationWarning: "", warningLabelClass: "" });
    this.props.reset_state();

    let email = this.state.email;
    let password = this.state.password;

    // Empty values validation
    if (email.match(/^\s*$/) || password.match(/^\s*$/)) {
      this.setState({
        validationWarning: "Empty values not accepted",
        warningLabelClass: "warningOn",
      });
      return;
    }

    // Email validation
    if (
      this.state.inputField &&
      this.state.inputField.checkValidity() == false
    ) {
      this.setState({
        validationWarning: "Invalid email format!",
        warningLabelClass: "warningOn",
      });
      return;
    }

    // Password length validation
    if (password.length < 6 || password.length > 20) {
      this.setState({
        validationWarning:
          "Passwords must be atleast 6 characters and atmost 20 characters",
        warningLabelClass: "warningOn",
      });
      return;
    }

    this.props.initiate_login({
      email,
      password,
    });
  }

  onFocusChange(e) {
    e.target.type == "email"
      ? this.setState({ email: e.target.value })
      : this.setState({ password: e.target.value });
    this.setState({ validationWarning: "", warningLabelClass: "" });
    if (e.target.type == "email") this.setState({ inputField: e.target });
  }

  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <form name="my-form">
        <span className={this.state.warningLabelClass}>
          {this.state.validationWarning}
        </span>
        <br />
        <MyTextField
          label="Email"
          variant="standard"
          type="email"
          onChange={(e) => this.onFocusChange(e)}
        />
        <br />
        <br />
        <MyTextField
          label="Password"
          variant="standard"
          type="password"
          onChange={(e) => this.onFocusChange(e)}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => this.onSubmit(e)}
        >
          LogIn
        </Button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    error: state.error,
    status: state.status,
  };
}

const mapDispatchToProps = {
  initiate_login,
  reset_state,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
