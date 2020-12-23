import React from "react";
import { connect } from "react-redux";
import { dispatch_message } from "../../store/actions/index";

import "./About.css";

import { Formik } from "formik";

import { serveText, serveLanguage } from "../../lang/index";

import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
            <Formik
              initialValues={{ message: "" }}
              validate={(values) => {
                const errors = {};
                // if (!values.email) {
                //   errors.email = "Required";
                // } else if (
                //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                // ) {
                //   errors.email = "Invalid email address";
                // }
                // if (!values.password) {
                //   errors.password = "Required";
                // } else if (
                //   !/[A-Z]/g.test(values.password) ||
                //   !/[!@#$%^&*(),.?"':{}|<>]/g.test(values.password) ||
                //   !/[0-9]/g.test(values.password)
                // ) {
                //   errors.password =
                //     "Password must contain capital letter(s), special character(s) & number(s)";
                // } else if (
                //   values.password.length < 6 ||
                //   values.password.length > 25
                // ) {
                //   errors.password =
                //     "Password must be atleast 6 and atmost 25 characters";
                // }
                if (/^\s*$/g.test(values.message)) {
                  errors.message = serveText(
                    this.props.language,
                    "empty_text_error"
                  );
                } else if (values.message.length < 12) {
                  errors.message =
                    serveText(this.props.language, "few_words_error") + " ...";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.props.dispatch_message(values.message);
                values.message = "";
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form name="about-form" onSubmit={handleSubmit}>
                  <MyTextField
                    id="message"
                    label={serveLanguage(this.props.language, "about_yourself")}
                    value={values.message}
                    multiline
                    rows={7}
                    variant="outlined"
                    // onChange={(e) => this.changeHandler(e)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.message && touched.message ? (
                    <p className="message-error">{errors.message}</p>
                  ) : (
                    <p className="message-error"></p>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    // onClick={(e) => this.onSubmit(e)}
                    disabled={isSubmitting}
                  >
                    {serveLanguage(this.props.language, "submit")}
                  </Button>
                </form>
              )}
            </Formik>
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
