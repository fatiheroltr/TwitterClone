import { useContext, useState } from "react";
import { ProfileFeedContext } from "./ProfileFeedContext";
import LoadingCircle from "../../LoadingCircle";
import FeedNavButton from "./FeedNavButton";
import FeedTweet from "./FeedTweet";
import Error from "../../Error";
import { ThemeContext } from "../../ThemeContext";

import styled from "styled-components";
import { light, dark } from "../../../constants";

const ProfileFeed = () => {
  const {
    state: { tweetsById, tweetIds, hasLoaded, error },
  } = useContext(ProfileFeedContext);

  const [selectedFeed, setSelectedFeed] = useState(1);
  const { selectTheme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <FeedNav selecttheme={selectTheme}>
        <FeedNavButton
          order={1}
          setState={setSelectedFeed}
          isSelected={selectedFeed === 1}
        >
          Tweets
        </FeedNavButton>
        <FeedNavButton
          order={2}
          setState={setSelectedFeed}
          isSelected={selectedFeed === 2}
        >
          Media
        </FeedNavButton>
        <FeedNavButton
          order={3}
          setState={setSelectedFeed}
          isSelected={selectedFeed === 3}
        >
          Likes
        </FeedNavButton>
      </FeedNav>

      {error ? (
        <Error message={error} />
      ) : !hasLoaded ? (
        <LoadingCircle circleSize={40} />
      ) : (
        <>
          {tweetIds.map((tweetId) => {
            const tweet = tweetsById[tweetId];

            return (
              <div key={tweet.id}>
                {selectedFeed === 1 && <FeedTweet tweet={tweet} />}
                {selectedFeed === 2 && tweet.media.length > 0 && (
                  <FeedTweet tweet={tweet} />
                )}
                {selectedFeed === 3 && tweet.isLiked && (
                  <FeedTweet tweet={tweet} />
                )}
              </div>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const FeedNav = styled.div`
  border-left: 1px ${(props) => props.selecttheme.greyLine} solid;
  border-right: 1px ${(props) => props.selecttheme.greyLine} solid;
  display: flex;
  transition: 0.3s ease-in-out;
`;

export default ProfileFeed;
