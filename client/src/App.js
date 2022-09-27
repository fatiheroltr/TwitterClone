import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SideBar from "./components/SideBar";
import HomeFeed from "./components/HomeFeed/";
import Profile from "./components/Profile";
import { CurrentUserContext } from "./components/CurrentUserContext";
import { ThemeContext } from "./components/ThemeContext";
import LoadingCircle from "./components/LoadingCircle";
import SingleTweet from "./components/Tweet/SingleTweet";
import Error from "./components/Error";

import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { light, dark } from "./constants";

const App = () => {
  const {
    state: { status },
    error,
  } = useContext(CurrentUserContext);

  const { selectTheme, setSelectTheme } = useContext(ThemeContext);
  useEffect(() => {
    setSelectTheme(light);
  }, []);

  return (
    <ThemeContainer selecttheme={selectTheme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <SideBar />
          <Main>
            <>
              {error ? (
                <Error message={error} />
              ) : status === "loading" ? (
                <LoadingCircle circleSize={40} />
              ) : (
                <Switch>
                  <Route exact path="/">
                    <HomeFeed />
                  </Route>
                  <Route path="/notifications">Notifications</Route>
                  <Route path="/bookmarks">Bookmarks</Route>
                  <Route path="/tweet/:tweetId">
                    <SingleTweet />
                  </Route>
                  <Route exact path="/:profileId">
                    <Profile />
                  </Route>
                </Switch>
              )}
            </>
          </Main>
        </Wrapper>
      </Router>
    </ThemeContainer>
  );
};

const ThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.selecttheme.background};
  color: ${(props) => props.selecttheme.black};
  overflow-y: overlay;
  transition: 0.3s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Main = styled.div`
  width: 650px;
  margin-left: 275px;
`;

export default App;
