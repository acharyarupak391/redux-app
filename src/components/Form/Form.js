import React from "react";
import "./Form.css";
import { connect } from "react-redux";
import { initiate_login, reset_state } from "../../store/actions/index";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

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
      validationWarning: "LogIn to continue!",
      warningLabelClass: "warningOn info",
      inputField: undefined,
      id: "",
    };
  }

  componentDidMount() {
    document.title = "Login";
  }

  componentDidUpdate(prevProps) {
    if (this.props.status && prevProps.status !== this.props.status) {
      this.setState({ id: "" });
      if (this.props.status == 200) {
        // this.setState({
        //   validationWarning:
        //     "Welcome, " +
        //     this.props.user.first_name +
        //     " " +
        //     this.props.user.last_name +
        //     " | ID: " +
        //     this.props.user.ID,
        //   warningLabelClass: "warningOn success",
        // });
      } else {
        this.setState({
          validationWarning:
            "Error " + this.props.status + ": " + this.props.error.message,
          warningLabelClass: "warningOn",
        });
      }
    }
  }

  onSubmit(e) {
    // e.preventDefault();
    this.setState({
      validationWarning: "",
      warningLabelClass: "",
    });
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
    this.setState({ id: "loader" });
  }

  onFocusChange(e) {
    e.target.type == "email"
      ? this.setState({ email: e.target.value })
      : this.setState({ password: e.target.value });
    this.setState({ validationWarning: "", warningLabelClass: "" });
    if (e.target.type == "email") this.setState({ inputField: e.target });
  }

  render() {
    return (
      <div className="form-div">
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
          <svg
            id={this.state.id}
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            enableBackground="new 0 0 40 40"
          >
            <path
              opacity="0.2"
              fill="#000"
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
            />
            <path
              fill="#000"
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
            ></path>
          </svg>
        </form>
      </div>
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
