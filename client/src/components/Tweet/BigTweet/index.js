import { useContext } from "react";
import { TweetContext } from "../TweetContext";
import { ThemeContext } from "../../ThemeContext";
import moment from "moment";
import Avatar from "./Avatar";
import Header from "./Header";
import Content from "./Content";
import LoadingCircle from "../../LoadingCircle";
import ActionBar from "../ActionBar";
import GoBack from "../../GoBack";

import styled from "styled-components";
import { light, dark } from "../../../constants";

const BigTweet = () => {
  const {
    state: { tweet, hasLoaded },
  } = useContext(TweetContext);

  const { selectTheme } = useContext(ThemeContext);

  return (
    <>
      {!hasLoaded ? (
        <LoadingCircle circleSize={40} />
      ) : (
        <>
          <GoBack isHome={false} />
          <TweetWrapper selecttheme={selectTheme}>
            <Container>
              <Avatar avatarSrc={tweet.author.avatarSrc} />
              <Header
                displayName={tweet.author.displayName}
                userName={tweet.author.handle}
                timestamp={tweet.timestamp}
              />
            </Container>
            <Content message={tweet.status} media={tweet.media} />
            <Date selecttheme={selectTheme}>
              {moment(tweet.timestamp).format("h:ss A")}
              <span>•</span>
              {moment(tweet.timestamp).format("MMM D YYYY")}
              <span>•</span>
              <span>Critter web app</span>
            </Date>
            <Divider selecttheme={selectTheme} />
            <ActionBar
              isRetweetedbyCurrentUser={tweet.isRetweeted}
              isLikedbyCurrentUser={tweet.isLiked}
              numberOfLikes={tweet.numLikes}
              numberOfRetweets={tweet.numRetweets}
              tweetId={tweet.id}
            />
          </TweetWrapper>
        </>
      )}
    </>
  );
};

const TweetWrapper = styled.div`
  overflow-y: overlay;
  box-sizing: border-box;
  border-left: 1px ${(props) => props.selecttheme.greyLine} solid;
  border-right: 1px ${(props) => props.selecttheme.greyLine} solid;
  border-bottom: 1px ${(props) => props.selecttheme.greyLine} solid;
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const Date = styled.span`
  padding-top: 20px;
  font-size: 17px;
  color: ${(props) => props.selecttheme.grey};
  & > span {
    padding: 0 5px;
  }
`;

const Divider = styled.div`
  margin-top: 20px;
  height: 1px;
  background: ${(props) => props.selecttheme.greyLine};
  transition: 0.3s ease-in-out;
`;

export default BigTweet;
