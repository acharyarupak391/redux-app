import React from "react";

class App extends React.Component {
  constructor(props) {
    super();
    console.log("props: ", props);
  }

  render() {
    return <h1>Hello from test</h1>;
  }
}

export default App;
