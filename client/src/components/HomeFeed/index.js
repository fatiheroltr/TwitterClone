import { useContext } from "react";
import { HomeFeedContext } from "./HomeFeedContext";
import { CurrentUserContext } from "../CurrentUserContext";
import { SmallTweet } from "../Tweet";
import LoadingCircle from "../LoadingCircle";

import GoBack from "../GoBack";
import Error from "../Error";
import NewTweet from "../NewTweet";

import styled from "styled-components";

const HomeFeed = () => {
  const {
    state: { tweetsById, tweetIds, hasLoaded },
    error,
  } = useContext(HomeFeedContext);

  const {
    state: { currentUser, status },
    userError,
  } = useContext(CurrentUserContext);

  return (
    <>
      <GoBack isHome={true} />
      <Container>
        {userError ? (
          <Error message={userError} />
        ) : status === "loading" ? (
          <LoadingCircle circleSize={40} />
        ) : (
          <NewTweet avatarSrc={currentUser.avatarSrc} />
        )}
      </Container>
      <Container>
        {error ? (
          <Error message={error} />
        ) : !hasLoaded ? (
          <LoadingCircle circleSize={40} />
        ) : (
          <SmallTweet tweetsById={tweetsById} tweetIds={tweetIds} />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
`;

export default HomeFeed;
