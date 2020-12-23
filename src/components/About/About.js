import React from "react";
import { connect } from "react-redux";
import { dispatch_message } from "../../store/actions/index";

import "./About.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

import serveLanguage from "../../lang/index";

const MyTextField = styled(TextField)({
  width: "80%",
  backgroundColor: "rgb(70, 70, 70)",
  borderRadius: "5px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
});
class About extends React.Component {
  constructor(props) {
    super();
    // console.log("About props: ", props);
    this.state = {
      text: "",
      textfield: null,
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
              {serveLanguage(this.props.language, "id")}: <span>{user.ID}</span>
            </p>
            <p>
              {serveLanguage(this.props.language, "working_at")}:{" "}
              <span>{user.company}</span>
            </p>
            <p>
              {serveLanguage(this.props.language, "designation")}:{" "}
              <span>{user.designation}</span>
            </p>
            <p>
              {serveLanguage(this.props.language, "joined")}:{" "}
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
              label={serveLanguage(this.props.language, "about_yourself")}
              multiline
              rows={7}
              variant="outlined"
              onChange={(e) => this.changeHandler(e)}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="inherit"
              onClick={(e) => this.onSubmit(e)}
            >
              {serveLanguage(this.props.language, "submit")}
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
    language: state.language,
  };
}

const mapDispatchToProps = {
  dispatch_message,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
