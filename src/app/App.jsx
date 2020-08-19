import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import store from "./store";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Main />
      </Router>
    </Provider>
  );
};

export default App;
