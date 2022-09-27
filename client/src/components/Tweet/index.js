import { useHistory } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import { light, dark } from "../../constants";
import { ThemeContext } from "../ThemeContext";
import { ProfileContextProvider } from "../Profile/ProfileContext";
import Avatar from "./Avatar";
import Header from "./Header";
import Content from "./Content";
import ActionBar from "./ActionBar";
import Retweet from "./RetweetButton/Retweet";

export const SmallTweet = ({ tweetsById, tweetIds }) => {
  const history = useHistory();
  const { selectTheme } = useContext(ThemeContext);

  return (
    <>
      {tweetIds.map((tweetId) => {
        const tweet = tweetsById[tweetId];

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
                <ProfileContextProvider profileId={tweet.author.handle}>
                  <Header
                    displayName={tweet.author.displayName}
                    userName={tweet.author.handle}
                    timestamp={tweet.timestamp}
                  />
                </ProfileContextProvider>
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
      })}
    </>
  );
};

const TweetWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.selecttheme.greyLine};
  border-left: 1px solid ${(props) => props.selecttheme.greyLine};
  border-bottom: 1px solid ${(props) => props.selecttheme.greyLine};
  &:hover {
    background-color: ${(props) => props.selecttheme.tweetHover};
    cursor: pointer;
  }
  transition: 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

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

const Column = styled.div``;
