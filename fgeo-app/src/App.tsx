import React from "react";
import "./App.less";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "store/reducers";
import Router from "./router";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
