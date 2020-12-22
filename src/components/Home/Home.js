import React from "react";
import { connect } from "react-redux";
import { change_language } from "../../store/actions/index";

import { IntlProvider, FormattedMessage } from "react-intl";

import { np, en, es, ch } from "../../lang";

import "./Home.css";
var msg_obj = {
  en,
  np,
  ch,
  es,
};
class Home extends React.Component {
  constructor(props) {
    super();
    // console.log("Home props: ", props);
  }

  componentDidMount() {
    document.title = "Home";
    this.props.onPageLoad("home");
  }

  changeLoggedOutState = () => {
    this.props.reset_state();
  };

  render() {
    var user = this.props.user;
    var dateString = new Date(user.CreatedAt.split("T")[0])
      .toDateString()
      .split(" ");
    return (
      <div id="home-outer-div">
        <IntlProvider
          key={this.props.language}
          messages={msg_obj[this.props.language]}
          locale="en"
        >
          <div className="home-info-div">
            <p>
              <FormattedMessage id="hello" values="" />,
            </p>
            <p className="name">
              {user.first_name} {user.last_name}
            </p>
            <p>
              <FormattedMessage id="joined" values="" />{" "}
              <span>
                {dateString[1]} {dateString[2]}, {dateString[3]}
              </span>
            </p>
          </div>
        </IntlProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    language: state.language,
  };
}

const mapDispatchToProps = {
  change_language,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
