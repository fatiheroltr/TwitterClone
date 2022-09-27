import { useParams } from "react-router-dom";
import { TweetContextProvider } from "./TweetContext";
import BigTweet from "./BigTweet";

const SingleTweet = () => {
  const { tweetId } = useParams();

  return (
    <TweetContextProvider tweetId={tweetId}>
      <BigTweet />
    </TweetContextProvider>
  );
};

export default SingleTweet;
