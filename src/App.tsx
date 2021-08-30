import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  checkIsAuthedAsync,
  getAllCoursesAsync,
  getLoggedInUserAsync,
  selectIsLoggedIn,
  selectLimit,
} from "./reducers";
import ProfilePage from "./pages/profile";

function App() {
  const dispatch = useDispatch();
  const limit = useSelector(selectLimit, shallowEqual);
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  //const skip = useSelector(selectLimit, shallowEqual);

  useEffect(() => {
    dispatch(checkIsAuthedAsync());
    dispatch(getLoggedInUserAsync());
    dispatch(getAllCoursesAsync({ limit, skip: 0 }));
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
