import React, { Component } from "react";
import BlogPost from "./components/BlogPost";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BlogPost />
      </Provider>
    );
  }
}

export default App;
