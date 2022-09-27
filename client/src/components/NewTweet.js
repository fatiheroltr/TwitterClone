import { useContext, useState } from "react";
import Avatar from "./Tweet/Avatar";
import LoadingCircle from "./LoadingCircle";
import { RiErrorWarningLine } from "react-icons/ri";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { ThemeContext } from "./ThemeContext";
import { HomeFeedContext } from "./HomeFeed/HomeFeedContext";

import styled from "styled-components";
import { light, dark } from "../constants";

const MAX_CHAR_LIMIT = 280;

const NewTweet = ({ avatarSrc }) => {
  const [error, setError] = useState(null);
  const [tweetText, setTweetText] = useState("");
  const [charCount, setCharCount] = useState(MAX_CHAR_LIMIT);
  const [sendButtonStatus, setSendButtonStatus] = useState("idle");

  const { selectTheme } = useContext(ThemeContext);

  // It triggers the re-fetching homefeed
  const { setTimeToFetch } = useContext(HomeFeedContext);

  const handleChange = (event) => {
    setTweetText(event.target.value);
    setCharCount(MAX_CHAR_LIMIT - event.target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTweetText("");
    setSendButtonStatus("sending");
    setCharCount(MAX_CHAR_LIMIT);
    setTimeToFetch(false);

    fetch("https://twitter-clone-13a.herokuapp.com/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: tweetText }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("An unknown error has occured.");
        }
        return res.json();
      })
      .then((data) => {
        setSendButtonStatus("idle");
        setTweetText("");
        setTimeToFetch(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Wrapper selecttheme={selectTheme}>
      <Column>
        <Avatar avatarSrc={avatarSrc} />
      </Column>
      <TextAreaWrapper charCount={charCount}>
        <TextArea
          autoFocus
          placeholder="What's happening?"
          maxLength={MAX_CHAR_LIMIT + 55}
          onChange={handleChange}
          value={tweetText}
          style={{ width: 550 }}
          selecttheme={selectTheme}
        />
      </TextAreaWrapper>
      <Counter charCount={charCount}>{charCount}</Counter>
      <form onSubmit={handleSubmit}>
        <MeowButton
          selecttheme={selectTheme}
          charCount={charCount}
          type="submit"
          disabled={
            tweetText.length > 0 && tweetText.length <= MAX_CHAR_LIMIT
              ? false
              : true
          }
        >
          {sendButtonStatus === "idle" ? (
            "Meow"
          ) : (
            <LoadingCircle circleSize={20} circleColor="light" />
          )}
        </MeowButton>
        {error && (
          <ErrorAlert>
            <RiErrorWarningLine style={{ paddingRight: "5px" }} size={30} />
            Something went wrong! <br />
            Please try refreshing the page and try again.
          </ErrorAlert>
        )}
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  border-right: 1px solid ${(props) => props.selecttheme.greyLine};
  border-left: 1px solid ${(props) => props.selecttheme.greyLine};
  border-bottom: 10px ${(props) => props.selecttheme.greyLine} solid;
  padding: 15px;
  width: 100%;
  transition: 0.3s ease-in-out;
  /* height: 180px; */
`;

const Column = styled.div`
  box-sizing: border-box;
  width: auto;
`;

const TextArea = styled(TextareaAutosize)`
  color: ${(props) => props.selecttheme.black};
  font-family: inherit;
  font-size: 20px;
  border: none;
  resize: none;
  margin-top: 10px;
  margin-bottom: 40px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const TextAreaWrapper = styled.div`
  opacity: ${(props) => (props.charCount === MAX_CHAR_LIMIT ? "0.2" : "1")};
`;

const Counter = styled.div`
  font-size: 15px;
  color: grey;
  color: ${(props) => props.charCount < 56 && "orange"};
  color: ${(props) => props.charCount < 0 && "red"};
  position: absolute;
  bottom: 22px;
  right: 125px;
  opacity: ${(props) => (props.charCount === MAX_CHAR_LIMIT ? "0.2" : "1")};
`;

const MeowButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 18px;
  font-weight: 700;
  background-color: ${(props) => props.selecttheme.primary};
  color: ${(props) => props.selecttheme.buttonLabel};
  width: 90px;
  height: 38px;
  border-radius: 30px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  z-index: 999;
  opacity: ${(props) =>
    props.charCount === MAX_CHAR_LIMIT || props.charCount < 0 ? "0.2" : "1"};
  cursor: ${(props) =>
    props.charCount !== MAX_CHAR_LIMIT && props.charCount >= 0 && "pointer"};

  &:hover {
    background-color: ${(props) =>
      props.charCount !== MAX_CHAR_LIMIT &&
      `${(props) => props.selecttheme.primaryHover}`};
  }
`;

const ErrorAlert = styled.span`
  display: flex;
  align-items: center;
  color: red;
  font-size: 14px;
  position: absolute;
  left: 80px;
  bottom: 18px;
`;

export default NewTweet;
