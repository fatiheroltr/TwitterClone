import { useReducer, useEffect, createContext, useState } from "react";

export const TweetContext = createContext();

const initialState = {
  tweet: null,
  hasLoaded: false,
};

const reducer = (currentState, action) => {
  return {
    ...currentState,
    tweet: action.tweet,
    hasLoaded: true,
  };
};

export const TweetContextProvider = ({ tweetId, children }) => {
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`https://twitter-clone-13a.herokuapp.com/api/tweet/${tweetId}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("An unknown error has occured.");
        }
        return res.json();
      })
      .then((data) => {
        receiveTweetFromServer(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const receiveTweetFromServer = (data) => {
    dispatch({
      ...data,
    });
  };

  return (
    <TweetContext.Provider value={{ error, state }}>
      {children}
    </TweetContext.Provider>
  );
};
