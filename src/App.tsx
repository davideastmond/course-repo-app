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
import ProtectedRoute from "./components/protected-route";

function App() {
  const dispatch = useDispatch();
  const limit = useSelector(selectLimit, shallowEqual);
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  //const skip = useSelector(selectLimit, shallowEqual);

  useEffect(() => {
    dispatch(checkIsAuthedAsync());
    dispatch(getLoggedInUserAsync());
    dispatch(getAllCoursesAsync({ limit, skip: 0 }));
  }, []);

  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path="/profile"
          component={ProfilePage}
          allowed={isLoggedIn}
          redirectTo="/"
        />
        <Route path="/profile" component={ProfilePage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
