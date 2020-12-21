import React from "react";

import { Route, Switch } from "react-router-dom";

import Form from "./components/Form";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

import { connect } from "react-redux";
import { reset_state } from "./actions/index";

// import Test from "./Test";

class App extends React.Component {
  constructor(props) {
    super();
    console.log("App props: ", props);
  }

  render() {
    // let testProps = { site: "test" };

    return (
      <div style={{ margin: 0 }}>
        {this.props.user ? (
          <Switch>
            {/* <Route path="/test" render={(props) => <Test {...testProps} />} /> */}
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        ) : (
          <Form />
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
