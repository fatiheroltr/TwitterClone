import styled from "styled-components";

const Content = ({ message, media }) => {
  return (
    <>
      <TweetText>{message}</TweetText>
      {media.length > 0 && <TweetImage src={media[0].url}></TweetImage>}
    </>
  );
};

const TweetText = styled.span`
  line-height: 28px;
  font-size: 23px;
  padding-top: 10px;
  padding-bottom: 10px;
  word-break: break-all;
`;

const TweetImage = styled.img`
  width: 100%;
  border-radius: 15px;
  margin-top: 10px;
`;

export default Content;
