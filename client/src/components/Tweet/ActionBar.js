import { useState } from "react";

import styled from "styled-components";
import LikeButton from "./LikeButton";
import Action from "./Action";
import TweetActionIcon from "./TweetActionIcon";
import RetweetButton from "./RetweetButton";

const ActionBar = ({
  isLikedbyCurrentUser,
  isRetweetedbyCurrentUser,
  numberOfLikes,
  numberOfRetweets,
  tweetId,
}) => {
  const [numOfLikes, setNumOfLikes] = useState(numberOfLikes);
  const [numOfRetweets, setNumOfRetweets] = useState(numberOfRetweets);
  const [isLiked, setIsLiked] = useState(isLikedbyCurrentUser);
  const [isRetweeted, setIsRetweeted] = useState(isRetweetedbyCurrentUser);

  const handleToggleLike = (ev) => {
    ev.stopPropagation();

    fetch(`https://twitter-clone-13a.herokuapp.com/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ like: !isLiked }),
    });
    // .then((res) => res.json())
    // .then((data) => {
    //   setIsLiked(!data.success);
    //   !data.success
    //     ? setNumOfLikes(numOfLikes + 1)
    //     : setNumOfLikes(numOfLikes - 1);
    // });

    setIsLiked(!isLiked);
    !isLiked ? setNumOfLikes(numOfLikes + 1) : setNumOfLikes(numOfLikes - 1);
  };

  const handleToggleRetweet = (ev) => {
    ev.stopPropagation();

    // fetch(`/api/tweet/${tweetId}/retweet`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({ retweet: !isRetweeted }),
    // });

    setIsRetweeted(!isRetweeted);
    !isRetweeted
      ? setNumOfRetweets(isRetweeted + 1)
      : setNumOfRetweets(isRetweeted - 1);
  };

  return (
    <Wrapper>
      <Action
        color="rgb(27, 149, 224)"
        size={30}
        onClick={(ev) => ev.stopPropagation()}
      >
        <TweetActionIcon kind="reply" />
      </Action>
      <Container>
        <Action
          color="rgb(23, 191, 99)"
          size={30}
          onClick={handleToggleRetweet}
        >
          <RetweetButton isRetweeted={isRetweeted} />
        </Action>
        <Number>{numOfRetweets > 0 && numOfRetweets}</Number>
      </Container>
      <Container>
        <Action color="rgb(224, 36, 94)" size={30} onClick={handleToggleLike}>
          <LikeButton isLiked={isLiked} numOfLikes={numOfLikes} />
        </Action>
        <Number>{numOfLikes > 0 && numOfLikes}</Number>
      </Container>
      <Action
        color="rgb(27, 149, 224)"
        size={30}
        onClick={(ev) => ev.stopPropagation()}
      >
        <TweetActionIcon kind="share" />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Number = styled.span`
  font-size: 15px;
`;

export default ActionBar;
