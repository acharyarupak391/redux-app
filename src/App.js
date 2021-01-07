import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

import { connect } from "react-redux";
import { reset_state } from "./store/actions/index";

class App extends React.Component {
  constructor(props) {
    super();
    // console.log("App props: ", props);
    this.state = { active: "none" };
  }

  changeActive = (activePage) => {
    this.setState({ active: activePage });
  };

  render() {
    let routeProps = { onPageLoad: this.changeActive };

    return (
      <div style={{ margin: 0 }}>
        {this.props.user ? (
          <div>
            <Navbar {...this.state} />
            <Switch>
              <Route
                exact
                path={["/", "/home"]}
                render={(props) => <Home {...routeProps} />}
              />
              <Route
                exact
                path="/about"
                render={(props) => <About {...routeProps} />}
              />
              <Route
                exact
                path="/contact"
                render={(props) => <Contact {...routeProps} />}
              />
              <Route path="/login">
                <Redirect to="/" />
              </Route>
              <Route render={() => <h1>Four OH! Four</h1>} />
            </Switch>
          </div>
        ) : (
          <Switch>
            <Route path="/login">
              <Form />
            </Route>
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
