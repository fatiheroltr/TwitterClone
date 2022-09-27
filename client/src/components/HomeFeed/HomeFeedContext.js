import { useReducer, useEffect, createContext, useState } from "react";

export const HomeFeedContext = createContext();

const initialState = {
  tweetsById: null,
  tweetIds: null,
  hasLoaded: false,
};

const reducer = (currentState, action) => {
  return {
    ...currentState,
    tweetsById: action.tweetsById,
    tweetIds: action.tweetIds,
    hasLoaded: true,
  };
};

export const HomeFeedProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  // for re-fetching after new tweet submit, send button triggers it
  const [timeToFetch, setTimeToFetch] = useState();

  useEffect(() => {
    fetch("https://twitter-clone-13a.herokuapp.com/api/me/home-feed")
      .then((res) => {
        if (!res.ok) {
          throw Error("An unknown error has occured.");
        }
        return res.json();
      })
      .then((data) => {
        receiveHomeFeedFromServer(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [timeToFetch && timeToFetch]);

  const receiveHomeFeedFromServer = (data) => {
    dispatch({
      ...data,
    });
  };

  return (
    <HomeFeedContext.Provider value={{ error, state, setTimeToFetch }}>
      {children}
    </HomeFeedContext.Provider>
  );
};
