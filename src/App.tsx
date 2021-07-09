import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";

import { useDispatch } from "react-redux";
import { getAllCoursesAsync } from "./reducers";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoursesAsync());
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
