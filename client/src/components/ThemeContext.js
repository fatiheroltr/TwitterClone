import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [selectTheme, setSelectTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        selectTheme,
        setSelectTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
