// import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { checkIsAuthedAsync, selectIsLoggedIn } from "./reducers";

function App() {
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  // useEffect(() => {
  //   dispatch(checkIsAuthedAsync());
  // }, [dispatch]);

  // useEffect(() => {
  //   console.log("useEffect, isLoggedIn", isLoggedIn);
  // }, [isLoggedIn]);
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
