import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reset_state } from "../../store/actions/index";

import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { styled } from "@material-ui/core/styles";

import { IntlProvider, FormattedMessage } from "react-intl";

import { np, en, es, ch } from "../../lang";

const MyInputLabel = styled(InputLabel)({
  color: "#1D0C00",
  padding: "5px",
  fontWeight: "bolder",
});

const MySelect = styled(Select)({
  color: "black",
  fontSize: "14px",
  backgroundColor: "rgba(255, 255, 255, 0.20)",
  fontFamily: "Raleway",
  fontWeight: "bolder",
  padding: "0 3px",
});

const MyFormControl = styled(FormControl)({});

class Navbar extends React.Component {
  constructor(props) {
    super();
    // console.log("Navbar props: ", props);
    this.state = {
      language: "en",
      locale: "en",
      messages: en,
    };
  }

  onLogout = () => {
    this.props.reset_state();
  };

  languageChange = (e) => {
    switch (e.target.value) {
      case "en":
        this.setState({ language: "en", locale: "en", messages: en });
        break;
      case "np":
        this.setState({ language: "np", locale: "np", messages: np });
        break;
      case "ch":
        this.setState({ language: "ch", locale: "ch", messages: ch });
        break;
      case "es":
        this.setState({ language: "es", locale: "es", messages: es });
        break;
      default:
        this.setState({ language: "en", locale: "en", messages: en });
        break;
    }
  };

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="toolbar">
            <IntlProvider
              key={this.state.locale}
              messages={this.state.messages}
              locale={this.state.locale}
            >
              <Link
                className={this.props.active == "home" ? "link active" : "link"}
                to="/"
              >
                <FormattedMessage id="home" values="" />
              </Link>
              <Link
                className={
                  this.props.active == "about" ? "link active" : "link"
                }
                to="/about"
              >
                <FormattedMessage id="about" values="" />
              </Link>
              <Link
                className={
                  this.props.active == "contact" ? "link active" : "link"
                }
                to="/contact"
              >
                <FormattedMessage id="contact" values="" />
              </Link>
              <span></span>
              <MyFormControl>
                <MyInputLabel>诶अ</MyInputLabel>
                <MySelect
                  labelId=""
                  id=""
                  value={this.state.language}
                  onChange={this.languageChange}
                  label="Language"
                  variant="filled"
                  color="primary"
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="np">नेपाली</MenuItem>
                  <MenuItem value="ch">中文</MenuItem>
                  <MenuItem value="es">Española</MenuItem>
                </MySelect>
              </MyFormControl>
              {this.props.active !== "none" ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={this.onLogout}
                >
                  <FormattedMessage id="logout" values="" />
                </Button>
              ) : (
                <i></i>
              )}
            </IntlProvider>
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
