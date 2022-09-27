import { useReducer, useEffect, createContext, useState } from "react";

export const CurrentUserContext = createContext();

const initialState = {
  currentUser: null,
  status: "loading",
};

const reducer = (currentState, action) => {
  return {
    ...currentState,
    currentUser: action.profile,
    status: "idle",
  };
};

export const CurrentUserProvider = ({ children }) => {
  const [userError, setUserError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveCurrentUserFromServer = (data) => {
    dispatch({
      ...data,
    });
  };

  useEffect(() => {
    fetch("https://twitter-clone-13a.herokuapp.com/api/me/profile")
      .then((res) => {
        if (!res.ok) {
          throw Error("An unknown error has occured.");
        }
        return res.json();
      })
      .then((data) => {
        receiveCurrentUserFromServer(data);
        setUserError(null);
      })
      .catch((err) => {
        setUserError(err.message);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        userError,
        state,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
