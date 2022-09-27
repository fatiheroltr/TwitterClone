import styled from "styled-components";
import Retweet from "./Retweet";
import PoppingCircle from "../LikeButton/PoppingCircle";
import TurnIn from "./TurnIn";

const RetweetButton = ({ size = 30, isRetweeted }) => {
  const retweetSize = size * 0.6;

  return (
    <Wrapper style={{ width: size, height: size }}>
      {isRetweeted ? (
        <TurnIn>
          <Retweet width={retweetSize} isToggled={isRetweeted} />
        </TurnIn>
      ) : (
        <Retweet width={retweetSize} isToggled={isRetweeted} />
      )}
      {isRetweeted && <PoppingCircle size={size} color="#35aef7" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RetweetButton;
