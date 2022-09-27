import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "../../Tweet/Avatar";
import Header from "../../Tweet/Header";
import Content from "../../Tweet/Content";
import ActionBar from "../../Tweet/ActionBar";
import Retweet from "../../Tweet/RetweetButton/Retweet";
import { ThemeContext } from "../../ThemeContext";

import styled from "styled-components";
import { light, dark } from "../../../constants";

const FeedTweet = ({ tweet }) => {
  const history = useHistory();
  const { selectTheme, setSelectTheme } = useContext(ThemeContext);

  return (
    <TweetWrapper
      selecttheme={selectTheme}
      key={tweet.id}
      onClick={() => {
        history.push(`/tweet/${tweet.id}`);
      }}
    >
      {tweet.retweetFrom && (
        <RetweetedByProfile selecttheme={selectTheme}>
          <Retweet width={"15px"} />
          <span>{tweet.retweetFrom.displayName} Remeowed</span>
        </RetweetedByProfile>
      )}

      <Container>
        <Avatar avatarSrc={tweet.author.avatarSrc} />
        <Column>
          <Header
            displayName={tweet.author.displayName}
            userName={tweet.author.handle}
            timestamp={tweet.timestamp}
          />
          <Content message={tweet.status} media={tweet.media} />
        </Column>
      </Container>
      <ActionBar
        isRetweetedbyCurrentUser={tweet.isRetweeted}
        isLikedbyCurrentUser={tweet.isLiked}
        numberOfLikes={tweet.numLikes}
        numberOfRetweets={tweet.numRetweets}
        tweetId={tweet.id}
      />
    </TweetWrapper>
  );
};

const TweetWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  transition: 0.3s ease-in-out;
  border-bottom: 1px solid ${(props) => props.selecttheme.greyLine};
  border-left: 1px ${(props) => props.selecttheme.greyLine} solid;
  border-right: 1px ${(props) => props.selecttheme.greyLine} solid;
  &:hover {
    background-color: ${(props) => props.selecttheme.tweetHover};
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Column = styled.div``;

const RetweetedByProfile = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  padding-top: 5px;
  padding-bottom: 14px;
  margin-left: 25px;
  color: ${(props) => props.selecttheme.grey};

  & span {
    margin-left: 20px;
  }
`;

export default FeedTweet;
