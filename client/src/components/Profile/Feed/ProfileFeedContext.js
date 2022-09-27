import { useReducer, useEffect, createContext, useState } from "react";

export const ProfileFeedContext = createContext();

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

export const ProfileFeedContextProvider = ({ handle, children }) => {
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`https://twitter-clone-13a.herokuapp.com/api/${handle}/feed`)
      .then((res) => {
        if (!res.ok) {
          throw Error("An unknown error has occured.");
        }
        return res.json();
      })
      .then((data) => {
        receiveProfileFeedFromServer(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [handle]);

  const receiveProfileFeedFromServer = (data) => {
    dispatch({
      ...data,
    });
  };

  return (
    <ProfileFeedContext.Provider
      value={{
        error,
        state,
      }}
    >
      {children}
    </ProfileFeedContext.Provider>
  );
};
