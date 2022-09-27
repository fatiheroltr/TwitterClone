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
  line-height: 20px;
  font-size: 15px;
  padding-top: 5px;
  word-break: break-all;
`;

const TweetImage = styled.img`
  width: 100%;
  max-height: 490px;
  border-radius: 15px;
  object-fit: cover;
  margin-top: 10px;
`;

export default Content;
