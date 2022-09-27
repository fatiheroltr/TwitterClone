import { useReducer, useEffect, createContext, useState } from "react";

export const ProfileContext = createContext();

const initialState = {
  profile: null,
  hasLoaded: false,
};

const reducer = (currentState, action) => {
  return {
    ...currentState,
    profile: action.profile,
    hasLoaded: true,
  };
};

export const ProfileContextProvider = ({ profileId, children }) => {
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`https://twitter-clone-13a.herokuapp.com/api/${profileId}/profile`)
      .then((res) => {
        if (!res.ok) {
          throw Error("An unknown error has occured.");
        }
        return res.json();
      })
      .then((data) => {
        receiveProfileFromServer(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [profileId]);

  const receiveProfileFromServer = (data) => {
    dispatch({
      ...data,
    });
  };

  return (
    <ProfileContext.Provider value={{ error, state }}>
      {children}
    </ProfileContext.Provider>
  );
};
