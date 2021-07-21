import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";

import { useDispatch } from "react-redux";
import {
  checkIsAuthedAsync,
  getAllCoursesAsync,
  getLoggedInUserAsync,
} from "./reducers";
import ProfilePage from "./pages/profile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoursesAsync());
    dispatch(checkIsAuthedAsync());
    dispatch(getLoggedInUserAsync());
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/profile" component={ProfilePage} />
      </Switch>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
