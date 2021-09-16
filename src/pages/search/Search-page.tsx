import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import "./search-page-style.css";
import HeaderBar from "../../components/header-bar";
import {
  checkIsAuthedAsync,
  logOutAsync,
  selectAllCourses,
  selectIsLoggedIn,
  selectLoggedInUser,
} from "../../reducers";
import doGoogleLogin from "../../services/auth";

import RadioGroup from "../../components/radio-group";
import { IRadioClicked } from "../../components/radio-group/Radio-toggle-set";
import StylizedTextInput from "../../components/stylized-text-input";
import {
  performSearchAsync,
  selectSearchResults,
  selectSearchString,
  setSearchString,
} from "../../reducers/search-slice";
import DataContainer from "../../components/course-container";

enum SearchResultFilterSetting {
  Courses = 0,
  Users = 1,
}
function SearchPage() {
  const [filterSetting, setFilterSetting] = useState<SearchResultFilterSetting>(
    SearchResultFilterSetting.Courses
  );

  const dispatch = useDispatch();
  const userData = useSelector(selectLoggedInUser, shallowEqual);
  const isLoggedIn = useSelector(selectIsLoggedIn, shallowEqual);
  const searchResults = useSelector(selectSearchResults, shallowEqual);
  const searchString = useSelector(selectSearchString, shallowEqual);
  const handleGoogleLogin = () => {
    // doGoogleLogin({ setDone, setErrorMessage });
    // setAuthInProgress(true);
    dispatch(checkIsAuthedAsync());
  };
  const handleLogOut = () => {
    dispatch(logOutAsync());
  };
  const handleRadioFilterClicked = (e: IRadioClicked) => {
    switch (e.label) {
      case "Courses":
        setFilterSetting(SearchResultFilterSetting.Courses);
        break;
      case "Users":
        setFilterSetting(SearchResultFilterSetting.Users);
        break;
    }
  };
  const handleOnSearchSubmit = (textInputValue: string) => {
    dispatch(performSearchAsync({ searchQuery: textInputValue }));
  };

  const handleSearchTextBoxChange = (e: any) => {
    const queryString = e.target.value;
    if (queryString) {
      dispatch(setSearchString(queryString));
    }
  };

  useEffect(() => {
    dispatch(performSearchAsync({ searchQuery: searchString }));
  }, [searchString]);
  return (
    <div className="Search-Page__container">
      <HeaderBar
        googleLoginAction={handleGoogleLogin}
        logOutAction={handleLogOut}
        loggedIn={isLoggedIn}
        userData={userData}
      />
      <div className="Search-Page__main-body display-flex">
        <div className="column-width-40vw"></div>
        <div className="Search-Page__search_inner-column column-width-40vw">
          <div className="Search-Page__search-section">
            <StylizedTextInput
              id="SearchPageTextBox"
              placeholderText="Search for a course..."
              inputBoxClassNames="search-box-styling main-font"
              onEnterKeyPressed={handleOnSearchSubmit}
              onTextChange={handleSearchTextBoxChange}
            />
          </div>
          <div className="Search-Page__filter-settings-container">
            {isLoggedIn && (
              <RadioGroup
                id="SearchPageResultsFilter"
                header="Filter by"
                options={["Courses", "Users"]}
                onRadioClicked={handleRadioFilterClicked}
              />
            )}
          </div>
          <div className="Search-Page__search-results-container">
            {filterSetting === SearchResultFilterSetting.Courses && (
              <DataContainer
                courses={searchResults.courses ? searchResults.courses : []}
                genericUserProfileClickHandler={() => {}}
                courseCardClickHandler={() => {}}
              />
            )}
            {filterSetting === SearchResultFilterSetting.Users && (
              <DataContainer
                users={searchResults.users ? searchResults.users : []}
                genericUserProfileClickHandler={() => {}}
                courseCardClickHandler={() => {}}
              />
            )}
          </div>
        </div>
        <div className="column-width-40vw"></div>
      </div>
    </div>
  );
}

export default SearchPage;
