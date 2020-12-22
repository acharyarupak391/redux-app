import React from "react";
import { connect } from "react-redux";
import { dispatch_message } from "../../store/actions/index";

import "./About.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";

import { IntlProvider, FormattedMessage } from "react-intl";
import { np, en, es, ch } from "../../lang";

var msg_obj = {
  en,
  np,
  ch,
  es,
};

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
          <IntlProvider
            key={this.props.language}
            messages={msg_obj[this.props.language]}
            locale="en"
          >
            <div className="info-panel">
              <p>
                {user.first_name} {user.last_name}
              </p>
              <p>
                <FormattedMessage id="id" values="" />: <span>{user.ID}</span>
              </p>
              <p>
                <FormattedMessage id="working_at" values="" />:{" "}
                <span>{user.company}</span>
              </p>
              <p>
                <FormattedMessage id="designation" values="" />:{" "}
                <span>{user.designation}</span>
              </p>
              <p>
                <FormattedMessage id="joined" values="" />:{" "}
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
                label={msg_obj[this.props.language]["about_yourself"]}
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
                <FormattedMessage id="submit" values="" />
              </Button>
            </div>
          </IntlProvider>
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
