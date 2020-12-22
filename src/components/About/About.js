import React from "react";
import { connect } from "react-redux";
import { dispatch_message } from "../../store/actions/index";

import "./About.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

const MyTextField = styled(TextField)({
  width: "80%",
  backgroundColor: "white",
  borderRadius: "5px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
});
class About extends React.Component {
  constructor(props) {
    super();
    // console.log("About props: ", props);
    let textfieldLabel;
    props.message
      ? (textfieldLabel = props.message)
      : (textfieldLabel = "About yourself!");
    this.state = {
      text: "",
      textfield: null,
      textfieldLabel: textfieldLabel,
    };
  }

  componentDidMount() {
    document.title = "About";
    this.props.onPageLoad("about");
  }

  changeHandler(e) {
    this.setState({
      text: e.target.value,
    });
    this.state.textfield
      ? this.setState({ textfield: this.state.textfield })
      : this.setState({ textfield: e.target });
  }

  focusHandler(e) {
    this.setState({ textfieldLabel: "About yourself!" });
  }

  blurHandler(e) {
    this.state.text == "" && this.props.message
      ? this.setState({ textfieldLabel: this.props.message })
      : this.setState({ textfieldLabel: "About yourself!" });
  }

  onSubmit(e) {
    if (this.state.text.match(/^\s*$/)) {
      return;
    }
    this.props.dispatch_message(this.state.text);
    this.state.textfield.value = "";
    this.setState({ text: "" });
  }

  render() {
    if (this.props.user) {
      var user = this.props.user;
      var dateString = new Date(user.CreatedAt.split("T")[0])
        .toDateString()
        .split(" ");
    }
    return (
      <div>
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
          <div className="about-form-div">
            <MyTextField
              id="filled-multiline-static"
              label={this.state.textfieldLabel}
              multiline
              rows={7}
              variant="outlined"
              onChange={(e) => this.changeHandler(e)}
              onFocus={(e) => this.focusHandler(e)}
              onBlur={(e) => this.blurHandler(e)}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="inherit"
              onClick={(e) => this.onSubmit(e)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    message: state.message,
  };
}

const mapDispatchToProps = {
  dispatch_message,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
