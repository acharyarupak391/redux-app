import React from "react";
import { connect } from "react-redux";
import { dispatch_message } from "../actions/index";

import Navbar from "../components/Navbar";
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
    this.state = {
      text: "",
    };
  }

  componentDidMount() {
    document.title = "About";
  }

  changeHandler(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onSubmit(e) {
    this.props.dispatch_message(this.state.text);
  }

  render() {
    let prop = { active: "about" };
    if (this.props.user) {
      var user = this.props.user;
      var dateString = new Date(user.CreatedAt.split("T")[0])
        .toDateString()
        .split(" ");
    }
    return (
      <div>
        <Navbar {...prop} />
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
              label="About yourself!"
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
