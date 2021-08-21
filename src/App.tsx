import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  checkIsAuthedAsync,
  getAllCoursesAsync,
  getLoggedInUserAsync,
  selectCourseLimit,
  selectCourseQueryType,
  selectCourseSkip,
} from "./reducers";
import ProfilePage from "./pages/profile";

function App() {
  const skip = useSelector(selectCourseSkip, shallowEqual);
  const limit = useSelector(selectCourseLimit, shallowEqual);
  const queryType = useSelector(selectCourseQueryType, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoursesAsync({ skip, limit, queryType }));
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
