import React, { createContext } from "react";
import useTheme from "../hooks/useTheme";

const THEME = {
  DARK: "dark",
  LIGHT: "light",
};

const ThemeContext = createContext();

const ThemeProvider = ({ children, startingTheme }) => {
  const state = useTheme(startingTheme);

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider, THEME };
